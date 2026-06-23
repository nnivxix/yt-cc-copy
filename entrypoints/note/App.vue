<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import {
  getNote,
  saveNote,
  deleteNote,
  updateNoteTitle,
  type NoteData,
} from "../../utils/storage";

const videoId = ref("");
const note = ref<NoteData | null>(null);
const editedText = ref("");
const loading = ref(true);
const saving = ref(false);
const deleting = ref(false);
const copied = ref(false);
const error = ref("");
const titleLoading = ref(false);

function getVideoIdFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") ?? "";
}

function thumbnailUrl(id: string): string {
  return `https://img.youtube.com/vi/${id}/default.jpg`;
}

async function fetchTitle(id: string): Promise<string | null> {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data.title ?? null;
  } catch {
    return null;
  }
}

async function ensureTitle(videoId: string) {
  if (note.value?.title) return;
  titleLoading.value = true;
  try {
    const title = await fetchTitle(videoId);
    if (title && note.value) {
      note.value.title = title;
      await updateNoteTitle(videoId, title);
    }
  } finally {
    titleLoading.value = false;
  }
}

async function loadNote() {
  loading.value = true;
  error.value = "";
  try {
    const id = getVideoIdFromUrl();
    if (!id) {
      error.value = "No video ID specified.";
      return;
    }
    videoId.value = id;
    const data = await getNote(id);
    if (!data) {
      error.value = "Note not found.";
      return;
    }
    note.value = data;
    editedText.value = data.text;
    await ensureTitle(id);
  } catch (e) {
    error.value = "Failed to load note.";
  } finally {
    loading.value = false;
  }
}

async function handleSave() {
  if (!videoId.value) return;
  saving.value = true;
  try {
    await saveNote(videoId.value, editedText.value);
    note.value!.text = editedText.value;
    note.value!.updatedAt = new Date().toISOString();
  } finally {
    saving.value = false;
  }
}

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(editedText.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 3000);
  } catch {
    // ignore
  }
}

async function handleDelete() {
  if (!videoId.value) return;
  if (!confirm("Delete this note?")) return;
  deleting.value = true;
  try {
    await deleteNote(videoId.value);
    window.close();
  } finally {
    deleting.value = false;
  }
}

function handleBack() {
  window.close();
}

const hasChanges = computed(() => {
  if (!note.value) return false;
  return editedText.value !== note.value.text;
});

onMounted(loadNote);
</script>

<template>
  <div class="container">
    <button class="btn btn-ghost back-btn" @click="handleBack">← Back</button>

    <div v-if="loading" class="state-msg">Loading note…</div>

    <div v-else-if="error" class="state-msg error-msg">{{ error }}</div>

    <template v-else-if="note">
      <div class="note-header">
        <img
          :src="thumbnailUrl(videoId)"
          alt="thumbnail"
          class="thumb"
        />
        <div class="note-meta">
          <h1 class="video-title">
            {{ titleLoading ? "Loading title…" : note.title || "Untitled" }}
          </h1>
          <span class="video-id">{{ videoId }}</span>
        </div>
      </div>

      <div class="editor-section">
        <textarea
          v-model="editedText"
          class="note-area"
          placeholder="Note content…"
        ></textarea>
      </div>

      <div class="actions">
        <button
          class="btn btn-primary"
          :disabled="saving || !hasChanges"
          @click="handleSave"
        >
          {{ saving ? "Saving…" : "Save" }}
        </button>
        <button
          class="btn btn-secondary"
          @click="handleCopy"
        >
          {{ copied ? "Copied" : "Copy" }}
        </button>
        <button
          class="btn btn-danger"
          :disabled="deleting"
          @click="handleDelete"
        >
          {{ deleting ? "…" : "Delete" }}
        </button>
      </div>

      <p v-if="hasChanges" class="unsaved-hint">Unsaved changes</p>
    </template>
  </div>
</template>
