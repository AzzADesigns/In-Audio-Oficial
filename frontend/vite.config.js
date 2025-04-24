import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import compression from "vite-plugin-compression";
export default defineConfig({
    plugins: [
        tailwindcss(),
        compression({ algorithm: "brotliCompress" })
    ],
});
