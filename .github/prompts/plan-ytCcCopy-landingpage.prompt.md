## Plan: GitHub Pages Landing Page

Create a standalone static landing page in `/Users/hanasa/Labs/personal/yt-cc-copy/pages` using plain HTML and CSS (no libraries), reusing repo branding/content from README and assets, so GitHub Pages can publish directly from `main` + `pages/`.

**Steps**
1. Phase 1 - Scaffold static site foundation.
2. Create `/Users/hanasa/Labs/personal/yt-cc-copy/pages/index.html` with semantic sections in this order: header/nav, hero, features, install/download links, screenshots, FAQ, contact/footer. Use only static HTML and external stylesheet link to `style.css`. Include proper metadata (`title`, description, viewport) and accessible structure (heading hierarchy, button/link labels, image alt text).
3. Create `/Users/hanasa/Labs/personal/yt-cc-copy/pages/style.css` with plain CSS variables and responsive layout. Reuse visual cues from popup styles (red primary action, neutral surfaces, rounded controls) while expanding to full-page desktop/mobile layout. Include clear breakpoints for mobile and tablet, plus hover/focus states.
4. Phase 2 - Populate content from existing project.
5. Port verified copy and links from README into landing page sections: product name and value proposition, feature bullets, Chrome Web Store link, Firefox Add-ons link, usage summary, and repository/contact link. Use repository local assets where possible for badges/screenshots (`/assets/chrome-extension.png`, `/assets/firefox-add-ons.png`).
6. Add FAQ entries based on existing setup/usage information (e.g., browser support, how to use, where notes are stored) without introducing claims unsupported by current code/docs.
7. Phase 3 - GitHub Pages readiness and repository alignment.
8. Add a short section to `/Users/hanasa/Labs/personal/yt-cc-copy/README.md` documenting GitHub Pages publishing source (`main` branch `/pages`) and local preview command options.
9. Optionally add npm script(s) in `/Users/hanasa/Labs/personal/yt-cc-copy/package.json` for quick local preview of pages (for example `preview:pages` using a simple static server command), only if dependency-free command is available in contributor workflow.
10. Phase 4 - QA and polish.
11. Validate relative paths for all links/images from `pages/index.html`, confirm layout behavior on narrow/mobile widths, and ensure no dependency on extension runtime or Vue.
12. Run project checks that are relevant and safe (`pnpm compile` optional, mainly to ensure no accidental impact), then perform manual browser open of `pages/index.html` and verify all sections render correctly.

**Relevant files**
- `/Users/hanasa/Labs/personal/yt-cc-copy/pages/index.html` — new static landing page markup with required sections.
- `/Users/hanasa/Labs/personal/yt-cc-copy/pages/style.css` — new plain CSS for layout, typography, responsive behavior, and component styling.
- `/Users/hanasa/Labs/personal/yt-cc-copy/README.md` — source content and deployment documentation updates.
- `/Users/hanasa/Labs/personal/yt-cc-copy/package.json` — optional pages preview script.
- `/Users/hanasa/Labs/personal/yt-cc-copy/assets/chrome-extension.png` — existing Chrome badge image.
- `/Users/hanasa/Labs/personal/yt-cc-copy/assets/firefox-add-ons.png` — existing Firefox badge image.
- `/Users/hanasa/Labs/personal/yt-cc-copy/entrypoints/popup/App.vue` — style/content reference for button labels and tone.
- `/Users/hanasa/Labs/personal/yt-cc-copy/entrypoints/popup/style.css` — existing color and spacing cues to adapt.

**Verification**
1. Open `pages/index.html` locally and verify all required sections exist: hero, features, install links, screenshots, FAQ, contact.
2. Confirm install buttons navigate to correct Chrome/Firefox URLs from README.
3. Confirm images load via relative paths and render correctly on desktop and mobile widths.
4. Run `pnpm compile` to ensure no regressions in the extension project (if README/package changes are made).
5. In GitHub Pages settings, verify source is configured to `main` branch `/pages` and page builds successfully.

**Decisions**
- Publish source: `pages/` folder on `main` branch (user-confirmed).
- Required sections include hero, features, install/download links, screenshots, FAQ, and contact/GitHub link (user-confirmed).
- Scope includes plain HTML + plain CSS only; excludes frameworks and UI libraries.
- Scope excludes redesign of extension popup UI and extension runtime logic.

**Further Considerations**
1. Screenshot strategy: Option A use current badge images only (fastest), Option B add popup screenshots for clearer product demo (recommended if available).
2. README update depth: Option A minimal publish instructions only, Option B include a full “Website” section with maintenance notes.