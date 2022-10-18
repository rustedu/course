import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const siteConfig = require('./site.config.json')

// https://vitejs.dev/config/
export default defineConfig({
  base: "course",
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    siteConfig: JSON.stringify(siteConfig.default)
  }
})
