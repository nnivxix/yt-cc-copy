class SiteHero extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <p class="eyebrow">
              Browser Extension
              <span class="version-badge">v0.3.0</span>
            </p>
            <h1>Copy YouTube captions and keep notes per video.</h1>
            <p class="lead">
              YT CC Copy helps you capture visible closed captions instantly,
              save them as notes, and reuse them later with clean one-click
              actions.
            </p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="#install">Install Now</a>
              <a
                class="btn btn-secondary"
                href="https://github.com/nnivxix/yt-cc-copy"
                target="_blank"
                rel="noreferrer"
                >View on GitHub
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"
                  /></svg
              ></a>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("site-hero", SiteHero);
