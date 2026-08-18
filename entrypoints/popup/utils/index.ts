import { browser } from "wxt/browser";
import { isYouTubeHostFromUrl, videoKey } from "../../../utils/youtube-url";

async function getActiveYouTubeTab() {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !tab.url || !isYouTubeHostFromUrl(tab.url)) return null;
  return tab;
}

export { videoKey, getActiveYouTubeTab };
