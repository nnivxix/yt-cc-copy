const YOUTUBE_HOSTS = ["youtube.com", "youtube-nocookie.com"];

function isYouTubeHost(hostname: string): boolean {
  const host = hostname.replace(/^www\./, "").toLowerCase();
  return YOUTUBE_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
}

export function isYouTubeVideoPage(url: string): boolean {
  try {
    const { hostname, pathname } = new URL(url);
    if (!isYouTubeHost(hostname)) return false;
    return (
      pathname === "/watch" || pathname.startsWith("/embed/") || pathname === "/shorts/"
    );
  } catch {
    return false;
  }
}

export function isYouTubeHostFromUrl(url: string): boolean {
  try {
    return isYouTubeHost(new URL(url).hostname);
  } catch {
    return false;
  }
}

export function extractVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    // /watch?v=ID
    const v = u.searchParams.get("v");
    if (v) return v;
    // /embed/ID
    const embedMatch = u.pathname.match(/^\/embed\/([^/?]+)/);
    if (embedMatch) return embedMatch[1];
    // /shorts/ID
    const shortsMatch = u.pathname.match(/^\/shorts\/([^/?]+)/);
    if (shortsMatch) return shortsMatch[1];
    return null;
  } catch {
    return null;
  }
}

/** Use the YouTube video ID as the storage key, falling back to the full URL. */
export function videoKey(url: string): string {
  return extractVideoId(url) ?? url;
}
