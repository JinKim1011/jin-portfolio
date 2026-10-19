import { put } from "@vercel/blob";
import { errorResponse } from "@/lib/utils/error-response";
import { getContentType } from "@/lib/notion/get-content-type";
import { serveBlob } from "@/lib/notion/serve-blob";

export async function mirrorAsset(
  pathname: string,
  pageId: string,
  sourceUrl: string | null,
  defaultContentType: string,
  cacheControl: string,
): Promise<Response> {
  if (!sourceUrl) {
    return errorResponse("Asset not found", 404);
  }

  try {
    const sourceResponse = await fetch(sourceUrl);
    if (!sourceResponse.ok || !sourceResponse.body) {
      console.error("Failed to fetch Notion asset", {
        pageId,
        status: sourceResponse.status,
      });
      return errorResponse("Failed to fetch asset", 502);
    }

    const contentType = getContentType(sourceResponse, defaultContentType);
    const blob = await put(pathname, sourceResponse.body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType,
      cacheControlMaxAge: 31536000,
    });

    return serveBlob(blob.url, cacheControl, contentType);
  } catch (error) {
    console.error("Failed to mirror Notion asset", { pageId, error });
    return errorResponse("Failed to mirror asset", 502);
  }
}
