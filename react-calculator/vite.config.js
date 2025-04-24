import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync } from 'fs'

// Vite config
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  // This ensures _redirects gets copied to dist after build
  closeBundle() {
    copyFileSync('public/_redirects', 'dist/_redirects')
  }
})
