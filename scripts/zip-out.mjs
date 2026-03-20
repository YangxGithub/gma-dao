import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import archiver from 'archiver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const modeArg = process.argv[2] || 'development';
const outDirName = modeArg === 'production' ? 'gma-dao-prod' : 'gma-dao-dev';
const outPath = path.join(root, outDirName);

const MAX_ZIPS = 3;

/** 同环境（gma-dao-dev / gma-dao-prod）下最多保留 maxKeep 个 zip，删掉更旧的 */
function pruneZips(zipDir, prefix, maxKeep) {
  if (!fs.existsSync(zipDir)) return;

  const entries = fs
    .readdirSync(zipDir)
    .filter((f) => f.startsWith(prefix) && f.endsWith('.zip'))
    .map((f) => {
      const full = path.join(zipDir, f);
      return { full, mtime: fs.statSync(full).mtimeMs };
    })
    .sort((a, b) => b.mtime - a.mtime);

  const toRemove = entries.slice(maxKeep);
  for (const { full } of toRemove) {
    fs.unlinkSync(full);
    console.log(`[zip-out] 已删除旧压缩包: ${path.basename(full)}`);
  }
}

if (!fs.existsSync(outPath)) {
  console.error(`[zip-out] 目录不存在，请先执行 build: ${outPath}`);
  process.exit(1);
}

const stamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
const zipFileName = `${outDirName}-${stamp}.zip`;
const zipDir = path.join(root, 'dist-zips');
const dest = path.join(zipDir, zipFileName);

fs.mkdirSync(zipDir, { recursive: true });

await new Promise((resolve, reject) => {
  const output = fs.createWriteStream(dest);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`[zip-out] 已生成: ${dest} (${archive.pointer()} bytes)`);
    pruneZips(zipDir, `${outDirName}-`, MAX_ZIPS);
    resolve();
  });

  archive.on('error', reject);
  archive.pipe(output);
  archive.directory(outPath, outDirName);
  archive.finalize();
});
