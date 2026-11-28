class SiteFaq extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="section section-alt" id="faq">
        <div class="container">
          <h2>FAQ</h2>
          <div class="faq-list">
            <details>
              <summary>Which browsers are supported?</summary>
              <p>
                YT CC Copy is published on the Chrome Web Store (Manifest V3)
                and Firefox Add-ons (Manifest V2), so it works in Chrome,
                Firefox, and Chromium-based browsers.
              </p>
            </details>
            <details>
              <summary>How do I copy captions?</summary>
              <p>
                Open a YouTube video with captions enabled, click the extension
                icon, then choose Copy CC. The currently visible caption line is
                copied straight to your clipboard.
              </p>
            </details>
            <details>
              <summary>How does translation work?</summary>
              <p>
                Click Translate to open the visible captions in Google
                Translate in a new tab. Pick a target language from the popup
                dropdown — it is remembered for next time (Indonesian by
                default) — and Google detects the source language automatically.
              </p>
            </details>
            <details>
              <summary>How do notes work?</summary>
              <p>
                Save to Note appends the captured captions to a note tied to the
                active video by its ID. Every video gets its own note, and Copy
                Note exports the full note for that video in one click.
              </p>
            </details>
            <details>
              <summary>Can I edit or manage my notes?</summary>
              <p>
                Yes. Open the Manage Notes dashboard to see every saved note
                with its thumbnail, title, excerpt, and last-updated time. From
                there you can re-sync video metadata, edit a note inline, or
                delete it.
              </p>
            </details>
            <details>
              <summary>Are my notes private?</summary>
              <p>
                Notes are stored locally in your browser using
                <code>browser.storage.local</code>. There are no accounts,
                servers, or telemetry, and caption text only leaves your device
                when you explicitly click Translate.
              </p>
            </details>
            <details>
              <summary>Can I clear saved notes?</summary>
              <p>
                Yes. The popup includes a Clear action to remove the saved note
                for the current video. Uninstalling the extension removes all
                locally stored data.
              </p>
            </details>
            <details>
              <summary>Which YouTube URLs are supported?</summary>
              <p>
                Standard watch pages, embeds, Shorts, and privacy-friendly
                youtube-nocookie.com embeds are all supported.
              </p>
            </details>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("site-faq", SiteFaq);
