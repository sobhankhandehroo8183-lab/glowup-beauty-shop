import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/glowup-beauty-shop/',
  server: {
    hmr: {
      overlay: false
    }
  }
})