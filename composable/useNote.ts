import { ref } from "vue";
import { browser } from "wxt/browser";
import { getActiveYouTubeTab, videoKey } from "../utils";
import { useCc } from "./useCc";
import { Status } from "../schema";

export const useNote = () => {
  const { getCC } = useCc();
  const noteText = ref("");
  const status = ref<Status>("idle");
  const message = ref("");
  const noteStatus = ref<Status>("idle");
  const noteMessage = ref("");
  const copyNoteStatus = ref<Status>("idle");

  function showNoteMessage(msg: string, s: Status) {
    noteStatus.value = s;
    noteMessage.value = msg;
    setTimeout(() => {
      noteMessage.value = "";
      noteStatus.value = "idle";
    }, 3000);
  }

  async function saveToNote() {
    status.value = "loading";
    message.value = "";
    noteStatus.value = "idle";
    noteMessage.value = "";
    try {
      const tab = await getActiveYouTubeTab();
      if (!tab?.url) {
        status.value = "error";
        message.value = "Open a YouTube video first";
        setTimeout(() => {
          message.value = "";
          status.value = "idle";
        }, 3000);
        return;
      }
      const text = await getCC();
      if (!text) return;

      const key = videoKey(tab.url);
      const existing =
        ((await browser.storage.local.get(key))[key] as string) ?? "";
      const updated = existing ? `${existing}\n${text}` : text;

      await browser.storage.local.set({ [key]: updated });
      noteText.value = updated;
      status.value = "idle";
      showNoteMessage("Saved to note!", "success");
    } catch {
      status.value = "error";
      message.value = "Something went wrong. Try again.";
      setTimeout(() => {
        message.value = "";
        status.value = "idle";
      }, 3000);
    }
  }

  async function copyNote() {
    if (!noteText.value) return;
    try {
      await navigator.clipboard.writeText(noteText.value);
      copyNoteStatus.value = "success";
      setTimeout(() => {
        copyNoteStatus.value = "idle";
      }, 3000);
    } catch {
      copyNoteStatus.value = "error";
      setTimeout(() => {
        copyNoteStatus.value = "idle";
      }, 3000);
    }
  }

  async function clearNote() {
    const tab = await getActiveYouTubeTab();
    if (!tab?.url) return;
    await browser.storage.local.remove(videoKey(tab.url));
    noteText.value = "";
    noteStatus.value = "idle";
    noteMessage.value = "";
  }
  async function loadNote() {
    const tab = await getActiveYouTubeTab();
    if (!tab?.url) return;
    const key = videoKey(tab.url);
    const stored = await browser.storage.local.get(key);
    noteText.value = (stored[key] as string) ?? "";
  }

  return {
    status,
    message,
    noteStatus,
    noteMessage,
    copyNoteStatus,
    noteText,
    saveToNote,
    copyNote,
    clearNote,
    loadNote,
  };
};
