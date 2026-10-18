import { BlobNotFoundError, head } from "@vercel/blob";
import { errorResponse } from "@/lib/utils/error-response";
import { serveBlob } from "@/lib/notion/serve-blob";

export async function serveMirroredAsset(
  pathname: string,
  pageId: string,
  cacheControl: string,
): Promise<Response | null> {
  try {
    const blob = await head(pathname);
    return serveBlob(blob.url, cacheControl, blob.contentType);
  } catch (error) {
    if (error instanceof BlobNotFoundError) {
      return null;
    }

    console.error("Failed to check mirrored asset", { pageId, error });
    return errorResponse("Failed to check mirrored asset", 502);
  }
}
