class SiteFeatures extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="section" id="features">
        <div class="container">
          <h2>Features</h2>
          <div class="feature-grid">
            <article class="card">
              <h3>Copy CC Instantly</h3>
              <p>
                Grab currently visible closed captions from YouTube without
                leaving the video.
              </p>
            </article>
            <article class="card">
              <h3>Save to Note</h3>
              <p>
                Append captured captions to a note tied to the active video for
                organized research.
              </p>
            </article>
            <article class="card">
              <h3>Copy Full Note</h3>
              <p>
                Pull your whole saved note to clipboard when you are ready to
                share or archive it.
              </p>
            </article>
            <article class="card">
              <h3>Translate Captions</h3>
              <p>
                Send the visible captions to Google Translate in a new tab, with
                a remembered target language picked from the popup dropdown.
              </p>
            </article>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("site-features", SiteFeatures);
