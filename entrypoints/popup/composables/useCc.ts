import { ref } from "vue";
import { browser } from "wxt/browser";
import { getActiveYouTubeTab } from "../utils";
import { useCopy } from "./useCopy";

export const useCc = () => {
  const status = ref<"idle" | "loading" | "success" | "error">("idle");
  const errorMessage = ref("");
  const { copied: ccCopied, copy } = useCopy();

  function setError(message: string) {
    status.value = "error";
    errorMessage.value = message;
    setTimeout(() => {
      status.value = "idle";
      errorMessage.value = "";
    }, 3000);
  }

  async function getCC(): Promise<string | null> {
    const tab = await getActiveYouTubeTab();
    if (!tab) {
      setError("Open a YouTube video first");
      return null;
    }

    let response;
    try {
      response = await browser.tabs.sendMessage(tab.id!, { action: "GET_CC" });
    } catch {
      setError("Could not reach the page. Try refreshing.");
      return null;
    }

    if (!response) {
      setError("Could not reach the page. Try refreshing.");
      return null;
    }

    if (!response.ok) {
      setError(
        response.reason === "CC_DISABLED"
          ? "Please enable CC on this video first"
          : "No captions visible right now",
      );
      return null;
    }

    return response.text as string;
  }

  async function copyCC() {
    status.value = "loading";
    errorMessage.value = "";
    try {
      const text = await getCC();
      if (!text) {
        if (status.value === "loading") status.value = "idle";
        return;
      }

      const ok = await copy(text);
      status.value = "idle";
      if (!ok) setError("Failed to copy captions. Please try again.");
    } catch {
      status.value = "idle";
      setError("Something went wrong. Please try again.");
    }
  }

  return {
    status,
    errorMessage,
    ccCopied,
    copyCC,
    getCC,
  };
};
