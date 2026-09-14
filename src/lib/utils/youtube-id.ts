const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/;

export function extractYouTubeId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "");

  if (host === "youtu.be") {
    const id = parsed.pathname.slice(1);
    return YOUTUBE_ID.test(id) ? id : null;
  }

  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const v = parsed.searchParams.get("v");
    if (v && YOUTUBE_ID.test(v)) return v;

    const match = parsed.pathname.match(
      /^\/(?:embed|shorts)\/([A-Za-z0-9_-]{11})/,
    );
    if (match) return match[1];
  }

  return null;
}
