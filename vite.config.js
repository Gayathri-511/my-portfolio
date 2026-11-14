import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Production builds are served from GitHub Pages at /my-portfolio/.
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  base: command === 'build' || isPreview ? '/my-portfolio/' : '/',
}))
