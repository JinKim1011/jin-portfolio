import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getCurrentPublishedPage } from "@/lib/notion/published-page";
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
