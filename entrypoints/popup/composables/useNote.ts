import { ref } from "vue";
import { getActiveYouTubeTab, videoKey } from "../utils";
import { useCc } from "./useCc";
import { useCopy } from "./useCopy";
import { getNote, saveNote, deleteNote } from "../../../utils/storage";
import { Status } from "../schema";

export const useNote = () => {
  const { getCC, errorMessage: ccErrorMessage } = useCc();
  const { copied: noteCopied, copy } = useCopy();
  const noteText = ref("");
  const status = ref<Status>("idle");
  const errorMessage = ref("");
  const noteStatus = ref<Status>("idle");

  function setTemporaryNoteStatus(s: Status) {
    noteStatus.value = s;
    setTimeout(() => {
      noteStatus.value = "idle";
    }, 3000);
  }

  function setMainError(message: string) {
    status.value = "error";
    errorMessage.value = message;
    setTimeout(() => {
      status.value = "idle";
      errorMessage.value = "";
    }, 3000);
  }

  async function saveToNote() {
    status.value = "loading";
    errorMessage.value = "";
    noteStatus.value = "idle";
    try {
      const tab = await getActiveYouTubeTab();
      if (!tab?.url) {
        setMainError("Open a YouTube video first");
        return;
      }
      const text = await getCC();
      if (!text) {
        if (ccErrorMessage.value) {
          setMainError(ccErrorMessage.value);
        }
        return;
      }

      const key = videoKey(tab.url);
      const existing = await getNote(key);
      const updated = existing ? `${existing.text}\n${text}` : text;

      await saveNote(key, updated);
      noteText.value = updated;
      status.value = "idle";
      setTemporaryNoteStatus("success");
    } catch {
      setMainError("Something went wrong. Please try again.");
    }
  }

  async function copyNote() {
    if (!noteText.value) return;
    await copy(noteText.value);
  }

  async function clearNote() {
    const tab = await getActiveYouTubeTab();
    if (!tab?.url) return;
    const key = videoKey(tab.url);
    await deleteNote(key);
    noteText.value = "";
    noteStatus.value = "idle";
  }

  async function loadNote() {
    const tab = await getActiveYouTubeTab();
    if (!tab?.url) return;
    const key = videoKey(tab.url);
    const data = await getNote(key);
    noteText.value = data?.text ?? "";
  }

  return {
    status,
    errorMessage,
    noteStatus,
    noteCopied,
    noteText,
    saveToNote,
    copyNote,
    clearNote,
    loadNote,
  };
};
