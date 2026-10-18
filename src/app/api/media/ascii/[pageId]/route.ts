import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getCurrentPublishedPage } from "@/lib/notion/published-page";

type RouteContext = {
  params: Promise<{ pageId: string }>;
};

const ASCII_CACHE_CONTROL = "public, max-age=31536000, immutable";
const DEFAULT_CONTENT_TYPE = "application/octet-stream";

function getAsciiCoverUrl(page: PageObjectResponse): string | null {
  const property = page.properties.asciiCover;

  if (property?.type !== "files") return null;

  const file = property.files[0];
  if (!file) return null;

  if (file.type === "external") return null;
  if (file.type === "file") return file.file.url;

  return null;
}

export async function GET(request: Request, { params }: RouteContext) {
  const { pageId } = await params;
  const version = new URL(request.url).searchParams.get("v");

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return errorResponse("Vercel Blob is not configured", 503);
  }

  const page = await getCurrentPublishedPage(pageId, version, "ASCII cover");
  if (page instanceof Response) return page;

  const pathname = `notion/ascii-covers/${pageId}/${version}`;

  const mirroredCover = await serveMirroredAsset(
    pathname,
    pageId,
    ASCII_CACHE_CONTROL,
  );
  if (mirroredCover) return mirroredCover;

  const sourceUrl = getAsciiCoverUrl(page);
  return mirrorAsset(
    pathname,
    pageId,
    sourceUrl,
    DEFAULT_CONTENT_TYPE,
    ASCII_CACHE_CONTROL,
  );
}
