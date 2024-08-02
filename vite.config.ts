import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { copyPackageJsonPlugin } from "./copy.plugin";
import dts from "vite-plugin-dts"
import tsconfigPaths from "vite-tsconfig-paths";
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

const pathSrc = path.resolve(__dirname, 'src');
const pathPackages = path.resolve(__dirname, 'packages');

// Vite 配置
export default defineConfig({
    resolve: {
        alias: {
            '@src': pathSrc,
            '@packages': pathPackages,
        },
    },
    plugins: [
        vue(),
        tsconfigPaths(),
        dts({
            insertTypesEntry: true,
            outDir: 'dist/types',
            include: ['./packages/**/*.ts', './packages/**/*.tsx', './packages/**/*.vue'],  // 添加此行
            tsconfigPath: './tsconfig.json'  // 明确指定 tsconfig 文件路径
        }),
        copyPackageJsonPlugin(),
        AutoImport({
            imports: [
                'vue',
                {
                    '@vueuse/core': [
                        'onKeyStroke'
                    ]
                }
            ],
            dts: path.resolve(pathPackages, 'auto-imports.d.ts'),
        }),
    ],
    build: {
        sourcemap: true,
        lib: {
            name: 'vue-files-preview',
            entry: './packages/index.ts',
        },
        commonjsOptions: {
            esmExternals: true
        },
        rollupOptions: {
            external: ['vue'],
            output: [
                {
                    globals: {
                        vue: 'Vue'
                    },
                    //打包格式
                    format: "es",
                    //打包后文件名
                    entryFileNames: "[name].mjs",
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    exports: "auto",
                    //配置打包根目录
                    dir: "./dist/es",
                },
                {
                    globals: {
                        vue: 'Vue'
                    },
                    //打包格式
                    format: "cjs",
                    //打包后文件名
                    entryFileNames: "[name].js",
                    //让打包目录和我们目录对应
                    preserveModules: true,
                    exports: "auto",
                    //配置打包根目录
                    dir: "./dist/lib",
                },
                // {
                //     entryFileNames: '[format]/[name].[format].js',
                //     assetFileNames: 'assets/[name].[ext]',
                //     exports: "auto",
                // }
            ],
        },
        minify: true
    }
});
