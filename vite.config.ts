import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    lib: {
      name: 'vue-files-preview',
      entry: './packages/index'
    }
  }
})
