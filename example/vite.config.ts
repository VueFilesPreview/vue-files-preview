import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vue-files-preview/' : '/',
  plugins: [vue()],
  resolve: {
    alias: [
      // vue-files-preview/xxx -> ../dist/xxx
      { find: /^vue-files-preview\/(.*)/, replacement: resolve(__dirname, '../dist/$1') },
      // vue-files-preview -> ../dist/es/packages/index.mjs
      { find: 'vue-files-preview', replacement: resolve(__dirname, '../dist/es/packages/index.mjs') },
      // buffer polyfill for browser
      { find: 'buffer', replacement: 'buffer/' },
    ],
  },
  server: {
    port: 6699,
    open: true,
  },
})
