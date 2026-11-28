# YT CC Copy

A browser extension that lets you copy YouTube closed captions (CC) to your clipboard and save them as notes per video.

## Features

- **Copy CC Instantly** — Grab the currently visible closed captions from any YouTube video with one click. Live caption segments are read directly from the player and copied to your clipboard, with smart errors when CC is disabled or no captions are visible.
- **Translate Captions** — Send the currently visible captions to Google Translate in a new tab with one click. The target language is picked from a dropdown in the popup and remembered for next time (default Indonesian); Google detects the source language automatically.
- **Save to Note** — Append captured captions to a note automatically tied to the active video by its ID. Each video gets its own dedicated note, so your research stays organized without manual labeling.
- **Per-Video Note Management** — Notes are keyed by video ID and persist locally in your browser. They survive restarts and require no account or cloud sync — your data stays on your device.
- **Copy Full Note** — Pull the entire saved note for a video to your clipboard in one action, ready to paste into docs, chat, or research tools.
- **Clear Notes** — Remove the saved note for the current video with a single click from the popup, without leaving YouTube.
- **Manage Notes Dashboard** — A dedicated page lists every saved note with thumbnail, auto-fetched video title, text excerpt, last-updated timestamp, and per-note **Re-sync** and **Delete** actions.
- **Edit Notes Inline** — Each note opens in its own editor page where you can edit text, save, copy, re-sync video metadata, delete, or jump back to the video on YouTube.
- **Automatic Video Metadata Sync** — Video titles and thumbnails are fetched from YouTube's public oEmbed API on first open, then cached locally. A manual **Re-sync** action refreshes metadata on demand, tracked by a `syncedAt` timestamp.
- **Broad YouTube URL Support** — Works across `/watch`, `/embed`, and `/shorts` URLs, including privacy-friendly `youtube-nocookie.com` embeds.
- **Cross-Browser Support** — Officially published on the [Chrome Web Store](https://chromewebstore.google.com/detail/youtube-cc-copy/phogekaakimfbfjolkjcnlbjdoipjgnf) (Manifest V3) and [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/youtube-cc-copy/) (Manifest V2), built on the WXT framework.
- **Local-First & Private** — All notes live in `browser.storage.local`. No servers, no accounts, no telemetry. Video metadata is fetched directly from YouTube's public oEmbed endpoint (no API key required). Caption data stays on your device unless you explicitly click **Translate**, which opens Google Translate with the caption text.
- **Clean, Focused Popup UI** — One-click **Copy CC**, **Add to Note**, and **Translate** actions, a read-only note preview with clear empty state, contextual status feedback ("Copied", "Added", loading), inline error messages with auto-dismiss, and quick links to Manage/Edit Notes and GitHub issues.

## Technical Highlights

- **Stack** — Vue 3 + TypeScript + WXT.
- **Storage** — Notes indexed via a local index for fast listing and ordered retrieval.
- **Backward Compatible** — Auto-migrates legacy plain-string notes to the structured `NoteData` format (with `createdAt`/`updatedAt` timestamps).
- **Content Script** — Lightweight listener that extracts `.ytp-caption-segment` text only when requested, with zero overhead when idle.

## Download

<p align="center">
    <a href="https://chromewebstore.google.com/detail/youtube-cc-copy/phogekaakimfbfjolkjcnlbjdoipjgnf?authuser=0&hl=en" target="_blank">
        <img src="https://github.com/nnivxix/yt-cc-copy/blob/main/assets/chrome-extension.png?raw=true" alt="Chrome Web Store">
    </a> 
    <a href="https://addons.mozilla.org/en-US/firefox/addon/youtube-cc-copy/" target="_blank">
        <img src="https://github.com/nnivxix/yt-cc-copy/blob/main/assets/firefox-add-ons.png?raw=true" alt="Firefox Add-ons">
    </a>
</p>

## Development

1. Clone the repository and install dependencies:

   ```sh
   pnpm install
   ```

2. Start the development server:

   ```sh
   pnpm dev
   ```

   This will open a browser with the extension loaded automatically.

## Chromium Installation (Manual)

1. Build the extension:

   ```sh
   pnpm build
   ```

   This will create a `.output/chrome-mv3` directory with the necessary files.

2. Open Chromium and navigate to `chrome://extensions`.
3. Enable **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the `.output/chrome-mv3` directory.

## Firefox Installation (Manual)

1. Build the extension for Firefox:

   ```sh
   pnpm build:ff
   ```

   This will create a `.output/firefox-mv2` directory with the necessary files.

2. Open Firefox and navigate to `about:debugging`.
3. Click **This Firefox** then **Load Temporary Add-on**.
4. Select the `manifest.json` file from the `.output/firefox-mv2` directory.

## Usage

1. Open a YouTube video and enable CC (closed captions).
2. Click the extension icon in the toolbar.
3. Click **Copy CC** to copy the current visible captions to your clipboard.
4. Click **Save to Note** to append captions to a per-video note.
5. Click **Translate** to open the current captions in Google Translate; use the dropdown next to it to change the target language (saved for next time).
6. Use **Copy Note** to copy the full saved note, or **Clear** to remove it.

## Contributing

Feel free to submit issues or pull requests to improve the extension.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
