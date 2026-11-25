import { onMounted, ref } from "vue";
import { browser } from "wxt/browser";
import {
  buildTranslateUrl,
  getTranslateLanguages,
  type TranslateLanguage,
} from "../../../utils/languages";
import { getSettings, saveSettings } from "../../../utils/settings";

export const useTranslate = (getCC: () => Promise<string | null>) => {
  const target = ref("id");
  const languages = ref<TranslateLanguage[]>(getTranslateLanguages());
  const translating = ref(false);
  const errorMessage = ref("");

  function setError(message: string) {
    errorMessage.value = message;
    setTimeout(() => {
      errorMessage.value = "";
    }, 3000);
  }

  async function loadTarget() {
    try {
      const { translateTarget } = await getSettings();
      target.value = translateTarget;
      languages.value = getTranslateLanguages(navigator.language, [
        translateTarget,
      ]);
    } catch {
      // Keep the default target when the preference can't be read.
    }
  }

  async function setTarget(code: string) {
    target.value = code;
    try {
      await saveSettings({ translateTarget: code });
    } catch {
      setError("Could not save your language preference.");
    }
  }

  async function translate() {
    translating.value = true;
    errorMessage.value = "";
    try {
      const text = await getCC();
      // getCC surfaces its own CC-disabled / CC-empty errors.
      if (!text) return;

      await browser.tabs.create({
        url: buildTranslateUrl(text, target.value),
      });
    } catch {
      setError("Could not open Google Translate. Please try again.");
    } finally {
      translating.value = false;
    }
  }

  onMounted(loadTarget);

  return {
    target,
    languages,
    translating,
    errorMessage,
    setTarget,
    translate,
  };
};
