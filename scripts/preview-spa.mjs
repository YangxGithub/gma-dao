import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getOutDir = () => {
  const idx = process.argv.indexOf('--outDir');
  if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  return process.env.OUT_DIR || 'dist';
};

const outDir = getOutDir();
const distRoot = path.resolve(__dirname, `../${outDir}`);
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.map': 'application/json; charset=utf-8'
};

const isFile = async (p) => {
  try {
    const s = await stat(p);
    return s.isFile();
  } catch {
    return false;
  }
};

const safeJoin = (root, reqPath) => {
  const normalized = reqPath.replace(/^\/+/, '');
  const abs = path.resolve(root, normalized);
  if (!abs.startsWith(root)) return null;
  return abs;
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);

    // 1) 先尝试按静态资源文件返回
    const filePath = safeJoin(distRoot, pathname);
    if (filePath && (await isFile(filePath))) {
      const ext = path.extname(filePath).toLowerCase();
      res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
      res.end(await readFile(filePath));
      return;
    }

    // 2) SPA history fallback
    const fallback = pathname.startsWith('/admin/') ? '/admin/index.html' : '/index.html';
    const fallbackPath = safeJoin(distRoot, fallback);
    if (!fallbackPath || !(await isFile(fallbackPath))) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(await readFile(fallbackPath));
  } catch (err) {
    res.statusCode = 500;
    res.end(`Server error: ${err instanceof Error ? err.message : String(err)}`);
  }
}).listen(port, () => {
  console.log(`SPA preview server running at http://localhost:${port}`);
});

