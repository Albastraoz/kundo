import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    outDir: isSsrBuild ? "dist/server" : "dist/client",
    emptyOutDir: !isSsrBuild,
    rollupOptions: isSsrBuild
      ? {
          output: {
            entryFileNames: "entry-server.mjs",
          },
        }
      : undefined,
  },
  ssr: {
    noExternal: ["react", "react-dom"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
