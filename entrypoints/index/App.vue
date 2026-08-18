<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { browser } from "wxt/browser";
import {
  getAllNotes,
  deleteNote,
  updateNoteMeta,
  type NoteData,
} from "../../utils/storage";
import { fetchVideoMeta } from "../../utils/youtube-api";

type Entry = [string, NoteData];

const entries = ref<Entry[]>([]);
const loading = ref(true);
const deleting = ref<string | null>(null);
const resyncing = ref<string | null>(null);

async function loadNotes() {
  loading.value = true;
  try {
    entries.value = await getAllNotes();
    for (const [id, note] of entries.value) {
      if (!note.syncedAt) {
        const meta = await fetchVideoMeta(id);
        if (meta) {
          note.title = meta.title;
          note.thumbnailUrl = meta.thumbnail_url;
          await updateNoteMeta(id, {
            title: meta.title,
            thumbnailUrl: meta.thumbnail_url,
          });
          note.syncedAt = new Date().toISOString();
        }
      }
    }
  } finally {
    loading.value = false;
  }
}

async function handleResync(videoId: string) {
  resyncing.value = videoId;
  try {
    const meta = await fetchVideoMeta(videoId);
    if (!meta) return;
    const entry = entries.value.find(([id]) => id === videoId);
    if (!entry) return;
    const [, note] = entry;
    note.title = meta.title;
    note.thumbnailUrl = meta.thumbnail_url;
    await updateNoteMeta(videoId, {
      title: meta.title,
      thumbnailUrl: meta.thumbnail_url,
    });
    note.syncedAt = new Date().toISOString();
  } finally {
    resyncing.value = null;
  }
}

async function handleDelete(videoId: string) {
  if (!confirm("Delete this note?")) return;
  deleting.value = videoId;
  try {
    await deleteNote(videoId);
    entries.value = entries.value.filter(([id]) => id !== videoId);
  } finally {
    deleting.value = null;
  }
}

function openNote(videoId: string) {
  const url = browser.runtime.getURL(
    `/note.html?id=${encodeURIComponent(videoId)}`,
  );
  browser.tabs.update({ url });
}

function excerpt(text: string, max = 100): string {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

onMounted(loadNotes);
</script>

<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Notes</h1>
      <button class="btn btn-secondary" @click="loadNotes">Refresh</button>
    </header>

    <div v-if="loading" class="state-msg">Loading notes…</div>

    <div v-else-if="entries.length === 0" class="state-msg">
      No saved notes yet.
    </div>

    <table v-else class="notes-table">
      <thead>
        <tr>
          <th class="col-thumb">Thumbnail</th>
          <th class="col-id">Title</th>
          <th class="col-excerpt">Excerpt</th>
          <th class="col-date">Last Updated</th>
          <th class="col-actions">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[id, note] in entries" :key="id" class="note-row">
          <td class="col-thumb" @click="openNote(id)">
            <img
              :src="note.thumbnailUrl"
              :alt="'thumbnail ' + id"
              class="thumb"
              loading="lazy"
            />
          </td>
          <td class="col-id">
            <a :href="`https://www.youtube.com/watch?v=${id}`" target="_blank">
              {{ id }}
            </a>
            <p class="video-title">{{ note.title || "-" }}</p>
          </td>
          <td class="col-excerpt" @click="openNote(id)">
            {{ excerpt(note.text) }}
          </td>
          <td class="col-date" @click="openNote(id)">
            {{ formatDate(note.updatedAt) }}
          </td>
          <td class="col-actions">
            <button
              class="btn btn-secondary btn-sm"
              :disabled="resyncing === id"
              @click="handleResync(id)"
            >
              {{ resyncing === id ? "…" : "Re-sync" }}
            </button>
            <button
              class="btn btn-danger btn-sm"
              :disabled="deleting === id"
              @click="handleDelete(id)"
            >
              {{ deleting === id ? "…" : "Delete" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
