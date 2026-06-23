<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { browser } from "wxt/browser";
import { getAllNotes, deleteNote, type NoteData } from "../../utils/storage";

type Entry = [string, NoteData];

const entries = ref<Entry[]>([]);
const loading = ref(true);
const deleting = ref<string | null>(null);

async function loadNotes() {
  loading.value = true;
  try {
    entries.value = await getAllNotes();
  } finally {
    loading.value = false;
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

function thumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/default.jpg`;
}

function excerpt(text: string, max = 100): string {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
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
          <th class="col-id">Video ID</th>
          <th class="col-excerpt">Excerpt</th>
          <th class="col-date">Last Updated</th>
          <th class="col-actions"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[id, note] in entries" :key="id" class="note-row">
          <td class="col-thumb" @click="openNote(id)">
            <img
              :src="thumbnailUrl(id)"
              alt="thumbnail"
              class="thumb"
              loading="lazy"
            />
          </td>
          <td class="col-id" @click="openNote(id)">{{ id }}</td>
          <td class="col-excerpt" @click="openNote(id)">
            {{ excerpt(note.text) }}
          </td>
          <td class="col-date" @click="openNote(id)">
            {{ formatDate(note.updatedAt) }}
          </td>
          <td class="col-actions">
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
