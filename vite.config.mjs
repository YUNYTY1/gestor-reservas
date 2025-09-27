import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    host: "0.0.0.0",
    // sin port → Vite usará el 5173 por defecto,
    // y si está ocupado buscará el siguiente libre (5174, 5175, etc.)
    strictPort: false,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  }
});
