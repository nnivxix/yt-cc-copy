# YT CC Copy

A browser extension that lets you copy YouTube closed captions (CC) to your clipboard and save them as notes per video.

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
5. Use **Copy Note** to copy the full saved note, or **Clear** to remove it.

## Contributing

Feel free to submit issues or pull requests to improve the extension.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
