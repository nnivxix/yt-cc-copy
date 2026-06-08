<script lang="ts" setup>
import { onMounted } from "vue";
import { useCc } from "./composables/useCc";
import { useNote } from "./composables/useNote";

const { getCC, status, ccCopied, copyCC } = useCc();
const {
  noteText,
  noteStatus,
  noteCopied,
  saveToNote,
  copyNote,
  clearNote,
  loadNote,
} = useNote();

onMounted(loadNote);
</script>

<template>
  <div class="container">
    <h2 class="title">YT CC Copy</h2>

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
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px 16px;
}

.title {
  margin: 0;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-align: center;
}

.btn-row {
  display: flex;
  gap: 8px;
}

.btn {
  flex: 1;
  padding: 9px 0;
  font-size: 0.9em;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition:
    background 0.2s,
    opacity 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: #ff0000;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #cc0000;
}

.btn-secondary {
  background: #333;
  color: #fff;
}

.btn-secondary:hover:not(:disabled) {
  background: #444;
}

.message {
  margin: 0;
  font-size: 0.85em;
  text-align: center;
}

.message.success {
  color: #4caf50;
}
.message.error {
  color: #f44336;
}

.note-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #333;
  padding-top: 12px;
}

.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.note-label {
  font-size: 0.82em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.6;
}

.btn-ghost {
  background: none;
  border: none;
  font-size: 0.82em;
  cursor: pointer;
  opacity: 0.55;
  color: inherit;
  padding: 2px 4px;
  border-radius: 4px;
  transition: opacity 0.15s;
}

.btn-ghost:hover {
  opacity: 1;
}

.note-area {
  width: 100%;
  height: 110px;
  resize: none;
  border-radius: 6px;
  border: 1px solid #444;
  background: #2a2a2a;
  color: inherit;
  font-family: inherit;
  font-size: 0.82em;
  padding: 8px;
  box-sizing: border-box;
  line-height: 1.5;
}

.note-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 8px;
}

.note-footer .btn {
  flex: none;
  padding: 7px 14px;
}

@media (prefers-color-scheme: light) {
  .btn-secondary {
    background: #e0e0e0;
    color: #111;
  }
  .btn-secondary:hover:not(:disabled) {
    background: #ccc;
  }
  .note-area {
    background: #f5f5f5;
    border-color: #ccc;
    color: #213547;
  }
  .note-section {
    border-top-color: #ddd;
  }
}
</style>
