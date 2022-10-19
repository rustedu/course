import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const siteConfig = require('./site.config.json')

// const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'docs')

// https://vitejs.dev/config/
export default defineConfig({
  base: '/course/',
  // root,
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    outDir,
    emptyOutDir: true,
  },
  define: {
    siteConfig: JSON.stringify(siteConfig.default)
  }
})
