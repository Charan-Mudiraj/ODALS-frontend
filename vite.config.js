import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    backendURL: JSON.stringify(
      process.env.BACKEND_URL || "http://localhost:8001"
    ),
  },
});
