import {Plugin} from 'vite';
import {writeFile, copyFileSync} from 'fs';
import {join} from 'path';

// 自定义插件来复制并修改 package.json
export const copyPackageJsonPlugin = (): Plugin => {
    return {
        name: 'copy-package-json',
        closeBundle() {
            const packageJson = require('./package.json');
            const distPackageJson = {
                name: packageJson.name,
                version: packageJson.version,
                main: './umd/index.umd.js',
                module: './es/index.es.js',
                types: './types/index.d.ts',
                files:  [
                    './',
                ],
                // peerDependencies: packageJson.peerDependencies,
                dependencies: packageJson.dependencies,
                description: packageJson.description,
                keywords: packageJson.keywords,
                author: packageJson.author,
                license: packageJson.license,
                repository: packageJson.repository,
                bugs: packageJson.bugs,
                homepage: packageJson.homepage
            };

            // 将 distPackageJson 写入 dist 目录
            writeFile(join(__dirname, 'dist', 'package.json'), JSON.stringify(distPackageJson, null, 2), (err) => {
                if (err) throw err;
                console.log('package.json copied and modified successfully!');
            });

            // 如果需要，可以复制 README.md 等其他文件到 dist 目录
            copyFileSync(join(__dirname, 'README.md'), join(__dirname, 'dist', 'README.md'));
        }
    };
};
