import {writeFileSync, readFileSync, existsSync,rmSync} from 'fs';
import {join} from 'path';

const packageJson = JSON.parse(readFileSync(join(__dirname, "../package.json"), 'utf-8'));
const versionTsPath = join(__dirname, "../packages", "version.ts");
const versionTs = `export const version = "${packageJson.version}";`;
writeFileSync(versionTsPath, versionTs);
console.log("version.ts create successful.");
