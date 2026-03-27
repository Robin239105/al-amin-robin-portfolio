import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: false, filename: 'bundle-stats.html' }),
    viteCompression()
  ],
  base: '/',
})



