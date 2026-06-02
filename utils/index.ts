import { browser } from "wxt/browser";
/** Use the YouTube video ID (?v=) as the storage key, falling back to the full URL. */
function videoKey(url: string): string {
  try {
    return new URL(url).searchParams.get("v") ?? url;
  } catch {
    return url;
  }
}

async function getActiveYouTubeTab() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !tab.url?.includes("youtube.com")) return null;
  return tab;
}

export { videoKey, getActiveYouTubeTab };
