<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { browser } from "wxt/browser";
import {
  getNote,
  saveNote,
  deleteNote,
  updateNoteMeta,
  type NoteData,
} from "../../utils/storage";
import { fetchVideoMeta } from "../../utils/youtube-api";
import { useCopy } from "../popup/composables/useCopy";

const { copied, copy } = useCopy();

const note = ref<NoteData | null>(null);
const editedText = ref("");
const loading = ref(true);
const saving = ref(false);
const deleting = ref(false);
const resyncing = ref(false);
const error = ref("");

const videoId = computed(() => {
  const params = new URLSearchParams(window.location.search);

  return params.get("id") ?? "";
});

const hasChanges = computed(() => {
  if (!note.value) return false;
  return editedText.value !== note.value.text;
});

async function loadNote() {
  loading.value = true;
  error.value = "";
  try {
    if (!videoId.value) {
      throw new Error("No video ID specified.");
    }

    note.value = await getNote(videoId.value);
    if (!note.value) {
      throw new Error("Note not found.");
    }

    if (!note.value.syncedAt) {
      const meta = await fetchVideoMeta(videoId.value);
      if (meta && note.value) {
        note.value.title = meta.title;
        note.value.thumbnailUrl = meta.thumbnail_url;
        await updateNoteMeta(videoId.value, {
          title: meta.title,
          thumbnailUrl: meta.thumbnail_url,
        });
        note.value.syncedAt = new Date().toISOString();
      }
    }
    editedText.value = note.value?.text;
  } catch (e) {
    error.value = e instanceof Error ? e.message : "Failed to load note.";
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
  await copy(editedText.value);
}

async function handleDelete() {
  if (!videoId.value) return;
  if (!confirm("Delete this note?")) return;
  deleting.value = true;
  try {
    await deleteNote(videoId.value);
    browser.tabs.update({ url: browser.runtime.getURL("/index.html") });
  } finally {
    deleting.value = false;
  }
}

async function handleResync() {
  if (!videoId.value || !note.value) return;
  resyncing.value = true;
  try {
    const meta = await fetchVideoMeta(videoId.value);
    if (!meta) return;
    note.value.title = meta.title;
    note.value.thumbnailUrl = meta.thumbnail_url;
    await updateNoteMeta(videoId.value, {
      title: meta.title,
      thumbnailUrl: meta.thumbnail_url,
    });
    note.value.syncedAt = new Date().toISOString();
  } finally {
    resyncing.value = false;
  }
}

function handleBack() {
  browser.tabs.update({ url: browser.runtime.getURL("/index.html") });
}

onMounted(loadNote);
</script>

<template>
  <div class="container">
    <button class="btn btn-ghost back-btn" @click="handleBack">← Back</button>

    <div v-if="loading" class="state-msg">Loading note…</div>

    <div v-else-if="error" class="state-msg error-msg">{{ error }}</div>

    <template v-else-if="note">
      <div class="note-header">
        <img :src="note.thumbnailUrl" alt="thumbnail" class="thumb" />
        <div class="note-meta">
          <h1 class="video-title">
            {{ note.title || "Untitled" }}
          </h1>
          <a
            :href="`https://www.youtube.com/watch?v=${videoId}`"
            target="_blank"
            class="video-id"
            >{{ videoId }}</a
          >
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
        <button class="btn btn-secondary" @click="handleCopy">
          {{ copied ? "Copied" : "Copy" }}
        </button>
        <button
          class="btn btn-secondary"
          :disabled="resyncing"
          @click="handleResync"
        >
          {{ resyncing ? "Syncing…" : "Re-sync" }}
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
