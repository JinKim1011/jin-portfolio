import { BlobNotFoundError, head, put } from "@vercel/blob";
import { isNotionClientError } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion, notionDataSourceId } from "@/lib/notion";

type RouteContext = {
  params: Promise<{ pageId: string }>;
};

const COVER_CACHE_CONTROL = "public, max-age=31536000, immutable";
const DEFAULT_CONTENT_TYPE = "application/octet-stream";

function errorResponse(error: string, status: number) {
  return Response.json({ error }, { status });
}

function getCoverUrl(page: PageObjectResponse): string | null {
  if (!page.cover) return null;
  return page.cover.type === "external"
    ? page.cover.external.url
    : page.cover.file.url;
}

async function serveBlob(url: string, contentType: string) {
  const response = await fetch(url);

  if (!response.ok || !response.body) {
    throw new Error(`Blob image request failed with status ${response.status}`);
  }

  return new Response(response.body, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": contentType,
    },
  });
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { pageId } = await params;
  const version = new URL(_request.url).searchParams.get("v");

  if (!version) {
    return Response.json(
      { error: "Cover version is required" },
      { status: 400 },
    );
  }

  if (!notion) {
    return Response.json(
      { error: "Notion is not configured" },
      { status: 503 },
    );
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json(
      { error: "Vercel Blob is not configured" },
      { status: 503 },
    );
  }

  let page: PageObjectResponse;

  try {
    const response = await notion.pages.retrieve({ page_id: pageId });

    if (!("properties" in response)) {
      return Response.json({ error: "Notion page not found" }, { status: 404 });
    }

    page = response;
  } catch (error) {
    if (isNotionClientError(error) && error.code === "object_not_found") {
      return Response.json({ error: "Notion page not found" }, { status: 404 });
    }

    console.error("Failed to retrieve Notion cover page", { pageId, error });
    return Response.json(
      { error: "Failed to retrieve cover page" },
      { status: 502 },
    );
  }

  if (
    !notionDataSourceId ||
    page.parent.type !== "data_source_id" ||
    page.parent.data_source_id !== notionDataSourceId
  ) {
    return Response.json({ error: "Unauthorized page" }, { status: 404 });
  }

  const published = page.properties.published;
  if (published?.type !== "checkbox" || !published.checkbox) {
    return Response.json({ error: "Cover not found" }, { status: 404 });
  }

  if (version !== page.last_edited_time) {
    return Response.json(
      { error: "Cover version is no longer current" },
      { status: 409 },
    );
  }

  const pathname = `notion/covers/${pageId}/${version}`;

  try {
    const blob = await head(pathname);
    return serveBlob(blob.url, blob.contentType);
  } catch (error) {
    if (!(error instanceof BlobNotFoundError)) {
      console.error("Failed to check mirrored cover image", { pageId, error });
      return Response.json(
        { error: "Failed to check mirrored cover image" },
        { status: 502 },
      );
    }
  }

  const sourceUrl = getCoverUrl(page);
  if (!sourceUrl) {
    return Response.json({ error: "Cover image not found" }, { status: 404 });
  }

  const sourceResponse = await fetch(sourceUrl);
  if (!sourceResponse.ok || !sourceResponse.body) {
    console.error("Failed to fetch Notion cover image", {
      pageId,
      status: sourceResponse.status,
    });
    return Response.json(
      { error: "Failed to fetch cover image" },
      { status: 502 },
    );
  }

  const blob = await put(pathname, sourceResponse.body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType:
      sourceResponse.headers.get("content-type") ?? "application/octet-stream",
    cacheControlMaxAge: 31536000,
  });

  return serveBlob(
    blob.url,
    sourceResponse.headers.get("content-type") ?? "application/octet-stream",
  );
}
