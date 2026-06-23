<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { browser } from "wxt/browser";
import { useCc } from "./composables/useCc";
import { useNote } from "./composables/useNote";

const url = browser.runtime.getURL("/index.html");
const isOnVideoPage = ref(false);

const { status, errorMessage: ccErrorMessage, ccCopied, copyCC } = useCc();
const {
  errorMessage: noteErrorMessage,
  noteText,
  noteStatus,
  noteCopied,
  saveToNote,
  copyNote,
  clearNote,
  loadNote,
} = useNote();

const errorText = computed(
  () => ccErrorMessage.value || noteErrorMessage.value,
);

onMounted(async () => {
  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  isOnVideoPage.value = !!tab?.url?.includes("youtube.com/watch");
  if (isOnVideoPage.value) loadNote();
});
</script>

<template>
  <div class="container">
    <h2 class="title">YT CC Copy</h2>

    <template v-if="isOnVideoPage">
      <div class="btn-row">
        <button
          class="btn btn-primary"
          :disabled="status === 'loading'"
          @click="copyCC"
        >
          {{ status === "loading" ? "…" : ccCopied ? "Copied" : "Copy CC" }}
        </button>
        <button
          class="btn btn-secondary"
          :disabled="status === 'loading'"
          @click="saveToNote"
        >
          {{ noteStatus === "success" ? "Added" : "Add to Note" }}
        </button>
      </div>

      <div class="note-section">
        <div class="note-header">
          <span class="note-label">Note</span>
          <button v-if="noteText" class="btn-ghost" @click="clearNote">
            Clear
          </button>
        </div>

        <textarea
          class="note-area"
          v-model="noteText"
          readonly
          placeholder="Nothing saved yet for this video."
        />

        <div class="note-footer">
          <button class="btn btn-primary" :disabled="!noteText" @click="copyNote">
            {{ noteCopied ? "Copied" : "Copy Note" }}
          </button>
        </div>
      </div>
    </template>
    <p v-else class="state-msg">
      Open a YouTube video to use YT CC Copy.
    </p>

    <div class="footer-message">
      <p v-if="errorText" class="error-text">
        {{ errorText }}
      </p>
      <p>
        Report issues or request features on
        <a
          href="https://github.com/nnivxix/yt-cc-copy/issues"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub.</a
        >
      </p>
      <p>
        <a :href="url" target="_blank" rel="noopener noreferrer"
          >Manage Notes</a
        >
      </p>
    </div>
  </div>
</template>
