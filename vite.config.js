import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 5 },
      mozjpeg: { quality: 70 },
      pngquant: { quality: [0.6, 0.8] },
      svgo: { plugins: [{ removeViewBox: false }] }
    })
  ],
  base: '/glowup-beauty-shop/',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: ['react-icons/fa', 'react-icons/ai', 'react-icons/md']
        }
      }
    }
  }
})