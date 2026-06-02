import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-vue"],
  manifest: {
    email: "hi@hanasa.id",
    name: "YouTube CC Copy",
    description: "Copy YouTube closed captions (CC) to clipboard",
    version: "0.0.1",
    short_name: "YT CC Copy",
    permissions: ["storage"],
  },
});
