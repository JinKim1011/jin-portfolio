export async function fetchCoverAscii(
  url: string | null,
): Promise<string | null> {
  if (!url) return null;

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return null;

    const text = await response.text();

    return text.length > 0 ? text : null;
  } catch {
    return null;
  }
}
