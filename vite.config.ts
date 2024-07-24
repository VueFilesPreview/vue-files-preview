import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import typescript from '@rollup/plugin-typescript';
import {copyPackageJsonPlugin} from "./copy.plugin";

// Vite 配置
export default defineConfig({
  plugins: [
    vue(),
    copyPackageJsonPlugin()
  ],
  build: {
    sourcemap: true,
    lib: {
      name: 'vue-files-preview',
      entry: './packages/index.ts',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue'
        },
        entryFileNames: '[format]/[name].[format].js',
        assetFileNames: 'assets/[name].[ext]'
      },
      external: ['vue'],
      plugins: [
        typescript({
          tsconfig: './tsconfig.json',
          declaration: true,
          declarationDir: 'dist/types',
          emitDeclarationOnly: true,
          rootDir: 'packages',
          include: [
            "./**/*.ts",
            "./**/*.d.ts",
            "./**/*.tsx",
            "./**/*.vue"
          ],
          exclude: ['./node_modules/**', './dist/**'],
          sourceMap: true,
        }),

      ]
    },
    minify: true
  }
});
