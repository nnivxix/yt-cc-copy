import { ref } from "vue";
import { browser } from "wxt/browser";
import { getActiveYouTubeTab, videoKey } from "../utils";
import { useCc } from "./useCc";
import { useCopy } from "./useCopy";
import { Status } from "../schema";

export const useNote = () => {
  const { getCC } = useCc();
  const { copied: noteCopied, copy } = useCopy();
  const noteText = ref("");
  const status = ref<Status>("idle");
  const noteStatus = ref<Status>("idle");

  function setTemporaryNoteStatus(s: Status) {
    noteStatus.value = s;
    setTimeout(() => {
      noteStatus.value = "idle";
    }, 3000);
  }

  function setTemporaryMainStatus(s: Status) {
    status.value = s;
    setTimeout(() => {
      status.value = "idle";
    }, 3000);
  }

  async function saveToNote() {
    status.value = "loading";
    noteStatus.value = "idle";
    try {
      const tab = await getActiveYouTubeTab();
      if (!tab?.url) {
        setTemporaryMainStatus("error");
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
      setTemporaryNoteStatus("success");
    } catch {
      setTemporaryMainStatus("error");
    }
  }

  async function copyNote() {
    if (!noteText.value) return;
    await copy(noteText.value);
  }

  async function clearNote() {
    const tab = await getActiveYouTubeTab();
    if (!tab?.url) return;
    await browser.storage.local.remove(videoKey(tab.url));
    noteText.value = "";
    noteStatus.value = "idle";
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
    noteStatus,
    noteCopied,
    noteText,
    saveToNote,
    copyNote,
    clearNote,
    loadNote,
  };
};
