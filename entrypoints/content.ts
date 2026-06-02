export default defineContentScript({
  matches: ["*://*.youtube.com/*"],
  main() {
    browser.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message?.action !== "GET_CC") return;

      // Check if CC is disabled (subtitles button is not pressed / toggled off)
      const ccButton = document.querySelector(".ytp-subtitles-button");
      if (ccButton && ccButton.getAttribute("aria-pressed") === "false") {
        sendResponse({ ok: false, reason: "CC_DISABLED" });
        return;
      }

      const segments = Array.from(
        document.querySelectorAll(".ytp-caption-segment"),
      )
        .map((el) => el.textContent?.trim() ?? "")
        .filter((text) => text.length > 0);

      if (segments.length === 0) {
        sendResponse({ ok: false, reason: "CC_EMPTY" });
        return;
      }

      sendResponse({ ok: true, text: segments.join("\n") });
    });
  },
});
