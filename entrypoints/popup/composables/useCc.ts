import { ref } from "vue";
import { browser } from "wxt/browser";
import { getActiveYouTubeTab } from "../utils";
import { useCopy } from "./useCopy";

export const useCc = () => {
  const status = ref<"idle" | "loading" | "success" | "error">("idle");
  const { copied: ccCopied, copy } = useCopy();

  function setTemporaryStatus(s: "success" | "error") {
    status.value = s;
    setTimeout(() => {
      status.value = "idle";
    }, 3000);
  }

  async function getCC(): Promise<string | null> {
    const tab = await getActiveYouTubeTab();
    if (!tab) {
      setTemporaryStatus("error");
      return null;
    }

    let response;
    try {
      response = await browser.tabs.sendMessage(tab.id!, { action: "GET_CC" });
    } catch {
      setTemporaryStatus("error");
      return null;
    }

    if (!response) {
      setTemporaryStatus("error");
      return null;
    }

    if (!response.ok) {
      setTemporaryStatus("error");
      return null;
    }

    return response.text as string;
  }

  async function copyCC() {
    status.value = "loading";
    try {
      const text = await getCC();
      if (!text) {
        if (status.value === "loading") status.value = "idle";
        return;
      }

      const ok = await copy(text);
      status.value = "idle";
      if (!ok) setTemporaryStatus("error");
    } catch {
      status.value = "idle";
      setTemporaryStatus("error");
    }
  }

  return {
    status,
    ccCopied,
    copyCC,
    getCC,
  };
};
