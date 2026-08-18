import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  manifest: {
    name: "YouTube CC Copy",
    description: "Copy YouTube closed-captions (CC) to clipboard",
    version: "0.2.0",
    short_name: "YT CC Copy",
    permissions: ["storage", "tabs"],
    browser_specific_settings: {
      gecko: {
        id: "yt-cc-copy@hanasa",
        data_collection_permissions: {
          required: ["none"],
          optional: [],
        },
      },
    },
  },
});
