import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import moment from "moment";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["moment/locale/es"],
  },
});
