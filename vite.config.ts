import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript';
import {copyPackageJsonPlugin} from "./copy.plugin";
import dts from "vite-plugin-dts";

// Vite 配置
export default defineConfig({
  plugins: [
    vue(),
    dts({ entryRoot: './packages' }),
    copyPackageJsonPlugin()
  ],
  build: {
    sourcemap: true,
    lib: {
      name: 'VueFilesPreview',
      entry: './packages/index.ts',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue'
        },
        entryFileNames: '[name].[format].js',
        assetFileNames: '[name].[ext]'
      },
      external: ['vue'],
      plugins: [
        typescript({
          tsconfig: './tsconfig.json',
          declaration: true,
          declarationDir: 'dist',
          rootDir: 'packages',
          exclude: ['./node_modules/**', './dist/**'],
          sourceMap: true
        }),

      ]
    },
    minify: false
  }
});