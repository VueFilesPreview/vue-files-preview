import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyPackageJsonPlugin } from "./copy.plugin";
import dts from "vite-plugin-dts"
import tsconfigPaths from "vite-tsconfig-paths";
// Vite 配置
export default defineConfig({
    plugins: [
        vue(),
        tsconfigPaths(),
        dts({
            insertTypesEntry: true,
            outDir: 'dist/types',
            include: ['./packages/**/*.ts', './packages/**/*.tsx', './packages/**/*.vue'],  // 添加此行
            tsconfigPath: './tsconfig.lib.json'  // 明确指定 tsconfig 文件路径
        }),
        copyPackageJsonPlugin()
    ],
    build: {
        sourcemap: true,
        lib: {
            name: 'vue-files-preview',
            entry: './packages/index.ts'
        },
        rollupOptions: {
            output: {
                globals: {
                    vue: 'Vue'
                },
                entryFileNames: '[format]/[name].[format].js',
                assetFileNames: 'assets/[name].[ext]',
                exports: "auto",
            },
            external: ['vue'],
        },
        minify: false
    }
});
