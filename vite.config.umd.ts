import path from 'node:path'
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

const pathPackages = path.resolve(__dirname, 'packages')

// UMD 构建配置 - 用于 CDN 引入
export default defineConfig({
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@packages': pathPackages,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    plugins: [
        vue(),
        AutoImport({
            imports: [
                'vue',
                {
                    '@vueuse/core': [
                        'onKeyStroke',
                    ],
                },
            ],
            dts: false,
        }),
    ],
    build: {
        outDir: 'dist/umd',
        sourcemap: true,
        lib: {
            name: 'VueFilesPreview',
            entry: './packages/index.umd.ts',
            formats: ['umd'],
            fileName: () => 'vue-files-preview.umd.js',
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
                exports: 'default',
            },
        },
        minify: true,
        emptyOutDir: false,
    },
})
