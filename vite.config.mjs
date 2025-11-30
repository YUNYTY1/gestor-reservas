import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",   // ←← OBLIGATORIO PARA VERCEL
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    host: "0.0.0.0",
    strictPort: false,
    allowedHosts: [".amazonaws.com", ".builtwithrocket.new"]
  }
});
