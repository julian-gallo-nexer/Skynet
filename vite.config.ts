import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: ["src/my-element.ts", "src/components/chat-interface.ts"], // your web component source file
      formats: ["es"],
    },
    outDir: "../umbraco14Test/App_Plugins/Client", // all compiled files will be placed here
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/], // ignore the Umbraco Backoffice package in the build
    },
  },
  base: "/App_Plugins/Client/", // the base path of the app in the browser (used for assets)
});
