class SiteHeader extends HTMLElement {
  connectedCallback() {
    const page = this.getAttribute("page") || "index";
    const brandHref = page === "index" ? "#top" : "./index.html";

    const navLinks =
      page === "index"
        ? [
            { href: "#features", label: "Features" },
            { href: "#install", label: "Install" },
            { href: "#faq", label: "FAQ" },
          ]
        : [];

    this.innerHTML = `
      <style>
        site-header .nav-list a.active {
          text-decoration: underline;
          text-underline-offset: 4px;
          text-decoration-thickness: 2px;
        }
      </style>
      <header class="site-header" id="top">
        <div class="container nav">
          <a class="brand" href="${brandHref}" aria-label="YT CC Copy home">YT CC Copy</a>
          <nav aria-label="Primary navigation">
            <ul class="nav-list">
              ${navLinks
                .map(
                  (l) =>
                    `<li><a href="${l.href}" data-nav-link>${l.label}</a></li>`,
                )
                .join("")}
            </ul>
          </nav>
        </div>
      </header>
    `;

    const links = this.querySelectorAll("[data-nav-link]");
    const activate = (href) => {
      links.forEach((l) =>
        l.classList.toggle("active", l.getAttribute("href") === href),
      );
    };

    links.forEach((link) => {
      link.addEventListener("click", () => activate(link.getAttribute("href")));
    });

    const hash = window.location.hash;
    if (hash) activate(hash);
    window.addEventListener("hashchange", () => activate(window.location.hash));
  }
}

customElements.define("site-header", SiteHeader);
