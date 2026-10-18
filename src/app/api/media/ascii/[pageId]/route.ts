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

  const sourceUrl = getAsciiCoverUrl(page);
  if (!sourceUrl) return errorResponse("ASCII cover not found", 404);

  try {
    const sourceResponse = await fetch(sourceUrl, { cache: "no-store" });
    if (!sourceResponse.ok || !sourceResponse.body) {
      console.error("Failed to fetch Notion ASCII cover", {
        pageId,
        status: sourceResponse.status,
      });
      return errorResponse("Failed to fetch ASCII cover", 502);
    }

    return new Response(sourceResponse.body, {
      headers: {
        "Cache-Control": ASCII_CACHE_CONTROL,
        "Content-Type":
          sourceResponse.headers.get("content-type") ?? DEFAULT_CONTENT_TYPE,
      },
    });
  } catch (error) {
    console.error("Failed to serve Notion ASCII cover", { pageId, error });
    return errorResponse("Failed to serve ASCII cover", 502);
  }
}
