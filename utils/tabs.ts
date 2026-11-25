import { browser, type Browser } from "wxt/browser";

/** Matches the Google Translate UI on any regional domain (e.g. translate.google.co.id). */
export function isGoogleTranslateUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    const { protocol, hostname } = new URL(url);
    if (protocol !== "https:" && protocol !== "http:") return false;
    return (
      hostname === "translate.google.com" ||
      /^translate\.google\.[a-z.]+$/i.test(hostname)
    );
  } catch {
    return false;
  }
}

/**
 * Finds an existing Google Translate tab, preferring the current window and
 * then the most recently accessed one.
 */
export async function findGoogleTranslateTab(
  currentWindowId?: number,
): Promise<Browser.tabs.Tab | null> {
  const tabs = await browser.tabs.query({});
  const matches = tabs.filter(
    (tab) => tab.id != null && isGoogleTranslateUrl(tab.url),
  );
  if (matches.length === 0) return null;

  const inCurrentWindow = matches.filter(
    (tab) => tab.windowId === currentWindowId,
  );
  const candidates = inCurrentWindow.length > 0 ? inCurrentWindow : matches;

  return (
    candidates.sort(
      (a, b) => (b.lastAccessed ?? 0) - (a.lastAccessed ?? 0),
    )[0] ?? null
  );
}
