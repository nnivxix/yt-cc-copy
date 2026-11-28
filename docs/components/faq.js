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
                The extension is available on Chrome and Firefox through their
                official extension stores.
              </p>
            </details>
            <details>
              <summary>How do I copy captions?</summary>
              <p>
                Open a YouTube video with captions enabled, click the extension,
                then use Copy CC.
              </p>
            </details>
            <details>
              <summary>How do notes work?</summary>
              <p>
                Use Save to Note to append captions for the active video, then
                use Copy Note to export everything.
              </p>
            </details>
            <details>
              <summary>Can I clear saved notes?</summary>
              <p>
                Yes. The popup includes a Clear action to remove saved note
                content for the current video.
              </p>
            </details>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("site-faq", SiteFaq);
