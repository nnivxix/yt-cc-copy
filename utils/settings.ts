import { browser } from "wxt/browser";

/** Prefixed so it never collides with note keys (video IDs) in local storage. */
const SETTINGS_KEY = "_yt_cc_settings";

export interface Settings {
  /** Google Translate target language code, e.g. "id". */
  translateTarget: string;
}

const DEFAULT_SETTINGS: Settings = {
  translateTarget: "id",
};

export async function getSettings(): Promise<Settings> {
  const result = await browser.storage.local.get(SETTINGS_KEY);
  const stored = result[SETTINGS_KEY] as Partial<Settings> | undefined;
  return { ...DEFAULT_SETTINGS, ...stored };
}

export async function saveSettings(patch: Partial<Settings>): Promise<void> {
  const current = await getSettings();
  await browser.storage.local.set({
    [SETTINGS_KEY]: { ...current, ...patch },
  });
}
