import {copyFileSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import type {Plugin} from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export function copyPackageJsonPlugin(): Plugin {
    return {
        name: 'copy-package-json',
        closeBundle() {
            try {
                const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'))
                const distPackageJson = {
                    name: packageJson.name,
                    version: packageJson.version,
                    main: './es/packages/index.mjs',
                    module: './es/packages/index.mjs',
                    unpkg: './umd/vue-files-preview.umd.js',
                    jsdelivr: './umd/vue-files-preview.umd.js',
                    types: './types/index.d.ts',
                    exports: {
                        '.': {
                            types: './types/index.d.ts',
                            import: './es/packages/index.mjs',
                            require: './lib/packages/index.js',
                        },
                        './es': {
                            types: './types/index.d.ts',
                            import: './es/packages/index.mjs',
                        },
                        './lib': {
                            types: './types/index.d.ts',
                            require: './lib/packages/index.js',
                        },
                        './es/packages/*.mjs': {
                            types: './types/*.d.ts',
                            import: './es/packages/*.mjs',
                        },
                        './lib/packages/*.js': {
                            types: './types/*.d.ts',
                            require: './lib/packages/*.js',
                        },
                        './es/packages/*': {
                            types: [
                                './types/*.d.ts',
                                './types/index.d.ts',
                            ],
                            import: './es/packages/*.mjs',
                        },
                        './lib/packages/version.js': {
                            types: './types/version.d.ts',
                            require: './lib/packages/version.js',
                        },
                        './es/packages/version.mjs': {
                            types: [
                                './types/version.d.ts',
                            ],
                            import: './es/packages/version.mjs',
                        },
                        './*': './*',
                    },
                    peerDependencies: packageJson.peerDependencies,
                    description: packageJson.description,
                    keywords: packageJson.keywords,
                    author: packageJson.author,
                    license: packageJson.license,
                    repository: packageJson.repository,
                    bugs: packageJson.bugs,
                    homepage: packageJson.homepage,
                }

                // 将 distPackageJson 写入 dist 目录
                writeFileSync(join(__dirname, '../dist', 'package.json'), JSON.stringify(distPackageJson, null, 2))
                console.log('package.json copied and modified successfully!')

                // 如果需要，可以复制 README.md 等其他文件到 dist 目录
                copyFileSync(join(__dirname, '../README.md'), join(__dirname, '../dist', 'README.md'))
            } catch (error) {
                console.error('Error while copying and modifying package.json:', error)
            }
        },
    }
}
