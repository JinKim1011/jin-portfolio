import { BlobNotFoundError, head, put } from "@vercel/blob";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getCurrentPublishedPage } from "@/lib/notion/published-page";
import { serveBlob } from "@/lib/notion/serve-blob";
import { errorResponse } from "@/lib/utils/error-response";
import { serveMirroredAsset } from "@/lib/notion/serve-mirrored-asset";
import { mirrorAsset } from "@/lib/notion/mirror-asset";

type RouteContext = {
  params: Promise<{ pageId: string }>;
};

const COVER_CACHE_CONTROL = "public, max-age=31536000, immutable";
const DEFAULT_CONTENT_TYPE = "application/octet-stream";

function getCoverUrl(page: PageObjectResponse): string | null {
  if (!page.cover) return null;
  return page.cover.type === "external"
    ? page.cover.external.url
    : page.cover.file.url;
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

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return errorResponse("Vercel Blob is not configured", 503);
  }

  const page = await getCurrentPublishedPage(pageId, version, "Cover");
  if (page instanceof Response) return page;

  const pathname = `notion/covers/${pageId}/${version}`;
  const mirroredCover = await serveMirroredAsset(
    pathname,
    pageId,
    COVER_CACHE_CONTROL,
  );
  if (mirroredCover) return mirroredCover;

  const sourceUrl = getCoverUrl(page);
  return mirrorAsset(
    pathname,
    pageId,
    sourceUrl,
    DEFAULT_CONTENT_TYPE,
    COVER_CACHE_CONTROL,
  );
}
