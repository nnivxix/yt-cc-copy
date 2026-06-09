class SiteFooter extends HTMLElement {
  connectedCallback() {
    const page = this.getAttribute("page") || "index";
    const prefix = page === "index" ? "" : "./index.html";
    const privacyLink =
      page === "index"
        ? `<li><a href="./privacy-policy.html">Privacy Policy</a></li>`
        : "";

    this.innerHTML = `
      <footer class="site-footer" id="contact">
        <div class="container footer-row">
          <div>
            <p style="font-size:14px;">&copy; ${new Date().getFullYear()} YT CC Copy. All rights reserved.</p>
            <p>Built for fast caption workflows on YouTube.</p>
          </div>
          <nav aria-label="Footer navigation">
            <ul class="nav-list">
              <li><a href="${prefix}#features">Features</a></li>
              <li><a href="${prefix}#install">Install</a></li>
              <li><a href="${prefix}#faq">FAQ</a></li>
              ${privacyLink}
              <li>
                <a
                  href="https://github.com/nnivxix/yt-cc-copy"
                  target="_blank"
                  rel="noreferrer"
                  >GitHub
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"
                    />
                  </svg></a
                >
              </li>
            </ul>
          </nav>
        </div>
      </footer>`;
  }
}

customElements.define("site-footer", SiteFooter);
