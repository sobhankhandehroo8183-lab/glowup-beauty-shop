import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/glowup-beauty-shop/', // مهم برای GitHub Pages
  plugins: [react()],
});
