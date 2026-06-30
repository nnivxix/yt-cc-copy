export interface YtOEmbedResponse {
  title: string
  author_name: string
  author_url: string
  type: "video"
  height: number
  width: number
  version: "1.0"
  provider_name: "YouTube"
  provider_url: "https://www.youtube.com/"
  thumbnail_url: string
  thumbnail_width: number
  thumbnail_height: number
  html: string
}

export async function fetchVideoMeta(
  videoId: string,
): Promise<YtOEmbedResponse | null> {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as YtOEmbedResponse;
  } catch {
    return null;
  }
}
