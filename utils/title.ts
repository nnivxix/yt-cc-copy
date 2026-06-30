import { updateNoteTitle } from "./storage";

export async function fetchVideoTitle(
  videoId: string,
): Promise<string | null> {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data.title ?? null;
  } catch {
    return null;
  }
}

export async function ensureNoteTitle(
  videoId: string,
): Promise<string | null> {
  const title = await fetchVideoTitle(videoId);
  if (title) {
    await updateNoteTitle(videoId, title);
  }
  return title;
}
