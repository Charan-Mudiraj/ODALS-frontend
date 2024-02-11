import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    backendURL: JSON.stringify(
      process.env.BACKEND_URL || "http://localhost:8001"
    ),
  },
});
