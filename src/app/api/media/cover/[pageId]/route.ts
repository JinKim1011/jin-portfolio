import { BlobNotFoundError, head, put } from "@vercel/blob";
import { isNotionClientError } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion, notionDataSourceId } from "@/lib/notion";

type RouteContext = {
  params: Promise<{ pageId: string }>;
};

const COVER_CACHE_CONTROL = "public, max-age=31536000, immutable";
const DEFAULT_CONTENT_TYPE = "application/octet-stream";

function errorResponse(message: string, status: number) {
  return Response.json({ message }, { status });
}

function getCoverUrl(page: PageObjectResponse): string | null {
  if (!page.cover) return null;
  return page.cover.type === "external"
    ? page.cover.external.url
    : page.cover.file.url;
}

function getContentType(response: Response): string {
  return response.headers.get("content-type") ?? DEFAULT_CONTENT_TYPE;
}

async function serveBlob(url: string, contentType: string): Promise<Response> {
  const response = await fetch(url);

  if (!response.ok || !response.body) {
    throw new Error(`Blob image request failed with status ${response.status}`);
  }

  return new Response(response.body, {
    headers: {
      "Cache-Control": COVER_CACHE_CONTROL,
      "Content-Type": contentType,
    },
  });
}

async function getPublishedPostPage(
  notionClient: NonNullable<typeof notion>,
  pageId: string,
): Promise<PageObjectResponse | Response> {
  try {
    const response = await notionClient.pages.retrieve({ page_id: pageId });

    if (!("properties" in response)) {
      return errorResponse("Notion page not found", 404);
    }

    if (
      !notionDataSourceId ||
      response.parent.type !== "data_source_id" ||
      response.parent.data_source_id !== notionDataSourceId
    ) {
      return errorResponse("Unauthorized page", 404);
    }

    const published = response.properties.published;
    if (published?.type !== "checkbox" || !published.checkbox) {
      return errorResponse("Cover not found", 404);
    }

    return response;
  } catch (error) {
    if (isNotionClientError(error) && error.code === "object_not_found") {
      return errorResponse("Notion page not found", 404);
    }

    console.error("Failed to retrieve Notion cover page", { pageId, error });
    return errorResponse("Failed to retrieve cover page", 502);
  }
}

async function serveMirroredCover(
  pathname: string,
  pageId: string,
): Promise<Response | null> {
  try {
    const blob = await head(pathname);
    return serveBlob(blob.url, blob.contentType);
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      return null;
    }

    console.error("Failed to check mirrored cover image", { pageId, error });
    return errorResponse("Failed to check mirrored cover image", 502);
  }
}

async function mirrorCover(
  page: PageObjectResponse,
  pathname: string,
  pageId: string,
): Promise<Response> {
  const sourceUrl = getCoverUrl(page);
  if (!sourceUrl) {
    return errorResponse("Cover image not found", 404);
  }

  try {
    const sourceResponse = await fetch(sourceUrl);
    if (!sourceResponse.ok || !sourceResponse.body) {
      console.error("Failed to fetch Notion cover image", {
        pageId,
        status: sourceResponse.status,
      });
      return errorResponse("Failed to fetch cover image", 502);
    }

    const contentType = getContentType(sourceResponse);
    const blob = await put(pathname, sourceResponse.body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType,
      cacheControlMaxAge: 31536000,
    });

    return serveBlob(blob.url, contentType);
  } catch (error) {
    console.error("Failed to mirror Notion cover image", { pageId, error });
    return errorResponse("Failed to mirror cover image", 502);
  }
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { pageId } = await params;
  const version = new URL(_request.url).searchParams.get("v");

  if (!version) return errorResponse("Cover version is required", 400);
  if (!notion) return errorResponse("Notion is not configured", 503);
  if (!notionDataSourceId) {
    return errorResponse("Notion data source is not configured", 503);
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return errorResponse("Vercel Blob is not configured", 503);
  }

  const page = await getPublishedPostPage(notion, pageId);
  if (page instanceof Response) return page;

  if (version !== page.last_edited_time) {
    return errorResponse("Cover version is no longer current", 409);
  }

  const pathname = `notion/covers/${pageId}/${version}`;
  const mirroredCover = await serveMirroredCover(pathname, pageId);
  if (mirroredCover) return mirroredCover;

  return mirrorCover(page, pathname, pageId);
}
