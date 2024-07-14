import { defineConfig } from 'vite'
import path from "path";
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    host:true,
    port:5173,
  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
})
