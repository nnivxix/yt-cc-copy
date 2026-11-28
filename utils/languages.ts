export interface TranslateLanguage {
  code: string;
  label: string;
}

/** Common Google Translate target languages. */
const LANGUAGE_CODES = [
  "id",
  "en",
  "ja",
  "ko",
  "zh-CN",
  "zh-TW",
  "ar",
  "hi",
  "th",
  "vi",
  "ms",
  "tl",
  "es",
  "fr",
  "de",
  "pt",
  "ru",
  "it",
  "nl",
  "tr",
  "pl",
  "uk",
  "iw",
  "sv",
  "da",
  "no",
  "fi",
  "cs",
  "sk",
  "ro",
  "hu",
  "el",
  "bg",
  "hr",
  "sr",
  "ca",
  "et",
  "lt",
  "lv",
  "sl",
  "fa",
  "ur",
  "bn",
  "ta",
  "te",
  "ml",
  "kn",
  "gu",
  "mr",
  "sw",
  "af",
  "sq",
  "hy",
  "az",
  "ka",
  "kk",
  "ky",
  "mn",
  "ne",
  "si",
  "km",
  "lo",
  "my",
  "uz",
  "be",
  "bs",
  "mk",
  "mt",
  "is",
  "ga",
  "cy",
  "eo",
  "jw",
  "su",
  "ceb",
];

/** Google Translate accepts the text via the URL, so keep it bounded. */
const MAX_TEXT_LENGTH = 5000;

function labelFor(
  displayNames: Intl.DisplayNames | undefined,
  code: string,
): string {
  try {
    return displayNames?.of(code) ?? code;
  } catch {
    return code;
  }
}

export function getTranslateLanguages(
  locale: string = navigator.language,
  extraCodes: string[] = [],
): TranslateLanguage[] {
  let displayNames: Intl.DisplayNames | undefined;
  try {
    displayNames = new Intl.DisplayNames([locale], { type: "language" });
  } catch {
    // Intl.DisplayNames unavailable — fall back to raw codes.
  }

  const codes = Array.from(new Set([...LANGUAGE_CODES, ...extraCodes]));
  return codes
    .map((code) => ({ code, label: labelFor(displayNames, code) }))
    .sort((a, b) => a.label.localeCompare(b.label, locale));
}

export function buildTranslateUrl(text: string, target: string): string {
  const params = new URLSearchParams({
    sl: "auto",
    tl: target,
    text: text.slice(0, MAX_TEXT_LENGTH),
    op: "translate",
  });
  return `https://translate.google.com/?${params.toString()}`;
}
