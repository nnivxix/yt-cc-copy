import { ref } from "vue";
import { browser } from "wxt/browser";
import { getActiveYouTubeTab } from "../utils";

export const useCc = () => {
  const status = ref<"idle" | "loading" | "success" | "error">("idle");
  const message = ref("");

  async function getCC(): Promise<string | null> {
    const tab = await getActiveYouTubeTab();
    if (!tab) {
      status.value = "error";
      message.value = "Open a YouTube video first";
      return null;
    }

    const response = await browser.tabs.sendMessage(tab.id!, {
      action: "GET_CC",
    });

    if (!response) {
      status.value = "error";
      message.value = "Could not reach the page. Try refreshing.";
      return null;
    }

    if (!response.ok) {
      status.value = "error";
      message.value =
        response.reason === "CC_DISABLED"
          ? "Please enable CC on this video first"
          : "No captions visible right now";
      return null;
    }

    return response.text as string;
  }

  async function copyCC() {
    status.value = "loading";
    message.value = "";
    try {
      const text = await getCC();
      if (!text) return;
      await navigator.clipboard.writeText(text);
      status.value = "success";
      message.value = "Copied!";
    } catch {
      status.value = "error";
      message.value = "Something went wrong. Try again.";
    }
  }

  return {
    status,
    message,
    copyCC,
    getCC,
  };
};
