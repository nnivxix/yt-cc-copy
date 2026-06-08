import { ref } from "vue";
import { browser } from "wxt/browser";
import { getActiveYouTubeTab } from "../utils";

export const useCc = () => {
  const status = ref<"idle" | "loading" | "success" | "error">("idle");
  const message = ref("");
  const copyCCStatus = ref<"idle" | "success" | "error">("idle");

  async function getCC(): Promise<string | null> {
    const tab = await getActiveYouTubeTab();
    if (!tab) {
      status.value = "error";
      message.value = "Open a YouTube video first";
      return null;
    }

    let response;
    try {
      response = await browser.tabs.sendMessage(tab.id!, { action: "GET_CC" });
    } catch {
      status.value = "error";
      message.value = "Could not reach the page. Try refreshing.";
      return null;
    }

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
      setTimeout(() => {
        message.value = "";
        status.value = "idle";
      }, 3000);
      return null;
    }

    return response.text as string;
  }

  function showMessage(msg: string, s: "success" | "error") {
    status.value = s;
    message.value = msg;
    setTimeout(() => {
      message.value = "";
      status.value = "idle";
    }, 3000);
  }

  async function copyCC() {
    status.value = "loading";
    message.value = "";
    try {
      const text = await getCC();
      if (!text) return;
      await navigator.clipboard.writeText(text);
      copyCCStatus.value = "success";
      setTimeout(() => {
        copyCCStatus.value = "idle";
      }, 3000);
      showMessage("Copied!", "success");
    } catch {
      showMessage("Something went wrong. Try again.", "error");
    }
  }

  return {
    status,
    message,
    copyCCStatus,
    copyCC,
    getCC,
  };
};
