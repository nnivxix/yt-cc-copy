<script lang="ts" setup>
import { ref } from "vue";

type Status = "idle" | "loading" | "success" | "error";

const status = ref<Status>("idle");
const message = ref("");

async function copyCC() {
  status.value = "loading";
  message.value = "";

  try {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab?.id || !tab.url?.includes("youtube.com")) {
      status.value = "error";
      message.value = "Open a YouTube video first";
      return;
    }

    const response = await browser.tabs.sendMessage(tab.id, {
      action: "GET_CC",
    });

    if (!response) {
      status.value = "error";
      message.value = "Could not reach the page. Try refreshing.";
      return;
    }

    if (!response.ok) {
      status.value = "error";
      message.value =
        response.reason === "CC_DISABLED"
          ? "Please enable CC on this video first"
          : "No captions visible right now";
      return;
    }

    await navigator.clipboard.writeText(response.text);
    status.value = "success";
    message.value = "Copied!";
  } catch {
    status.value = "error";
    message.value = "Something went wrong. Try again.";
  }
}
</script>

<template>
  <div class="container">
    <h2 class="title">YT CC Copy</h2>
    <button
      class="copy-btn"
      :class="{ loading: status === 'loading' }"
      :disabled="status === 'loading'"
      @click="copyCC"
    >
      {{ status === "loading" ? "Copying…" : "Copy Captions" }}
    </button>
    <p
      v-if="message"
      class="message"
      :class="{ success: status === 'success', error: status === 'error' }"
    >
      {{ message }}
    </p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px 20px;
}

.title {
  margin: 0;
  font-size: 1.1em;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.copy-btn {
  width: 100%;
  padding: 10px 0;
  font-size: 0.95em;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  background: #ff0000;
  color: #fff;
  cursor: pointer;
  transition:
    background 0.2s,
    opacity 0.2s;
}

.copy-btn:hover:not(:disabled) {
  background: #cc0000;
}

.copy-btn.loading,
.copy-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  margin: 0;
  font-size: 0.88em;
  text-align: center;
}

.message.success {
  color: #4caf50;
}

.message.error {
  color: #f44336;
}
</style>
