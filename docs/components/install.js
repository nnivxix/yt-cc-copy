class SiteInstall extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="section section-alt" id="install">
        <div class="container">
          <h2>Install / Download</h2>
          <p class="section-intro">
            Choose your browser and install from the official store.
          </p>
          <div class="store-grid">
            <a
              class="store-link"
              href="https://chromewebstore.google.com/detail/youtube-cc-copy/phogekaakimfbfjolkjcnlbjdoipjgnf?authuser=0&hl=en"
              target="_blank"
              rel="noreferrer"
              aria-label="Install from Chrome Web Store"
            >
              <img
                src="./assets/chrome-extension.svg"
                alt="Chrome Web Store icon"
              />
              <span class="store-copy">
                <strong>Chrome Web Store</strong>
                <small>Install YT CC Copy for Chrome</small>
              </span>
            </a>
            <a
              class="store-link"
              href="https://addons.mozilla.org/en-US/firefox/addon/youtube-cc-copy/"
              target="_blank"
              rel="noreferrer"
              aria-label="Install from Firefox Add-ons"
            >
              <img
                src="./assets/firefox-add-ons.svg"
                alt="Firefox Add-ons icon"
              />
              <span class="store-copy">
                <strong>Firefox Add-ons</strong>
                <small>Install YT CC Copy for Firefox</small>
              </span>
            </a>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define("site-install", SiteInstall);
