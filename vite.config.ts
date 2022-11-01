import { resolve } from 'path'
import { defineConfig } from 'vite'
import vitePluginImp from 'vite-plugin-imp'
import { visualizer } from 'rollup-plugin-visualizer'
import react from '@vitejs/plugin-react'

import siteConfig from './site.config'

// const root = resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  base: '/course/',
  // root,
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'lodash',
          libDirectory: '',
          camel2DashComponentName: false
        },
        {
          libName: 'antd',
          style(name) {
            // use less
            return `antd/es/${name}/style`
          }
        }
      ]
    }),
    visualizer()
  ],
  build: {
    rollupOptions: {
      manualChunks(id) {
        if (id.includes('node_modules')) {
          return 'vendor'
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    siteConfig: JSON.stringify(siteConfig)
  }
})
