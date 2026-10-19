export async function serveBlob(
  url: string,
  cacheControl: string,
  contentType: string,
): Promise<Response> {
  const response = await fetch(url);

  if (!response.ok || !response.body) {
    throw new Error(`Blob image request failed with status ${response.status}`);
  }

  return new Response(response.body, {
    headers: {
      "Cache-Control": cacheControl,
      "Content-Type": contentType,
    },
  });
}
