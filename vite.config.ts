import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const outDir = mode === 'production' ? 'gma-dao-prod' : 'gma-dao-dev';

  return {
    plugins: [
      // 开发环境下：让 /admin/*（不带文件后缀）走 admin/index.html，而不是官网 index.html
      {
        name: 'dev-admin-history-fallback',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            const url = req.url || '';
            // 仅处理 /admin 开头且不包含文件扩展名的路径，如 /admin、/admin/users
            const isAdminPath =
              url.startsWith('/admin') &&
              !url.match(/\.[a-zA-Z0-9]+($|\?)/);

            if (isAdminPath) {
              req.url = '/admin/index.html';
            }

            next();
          });
        }
      },
      vue()
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    build: {
      outDir,
      rollupOptions: {
        input: {
          site: resolve(__dirname, 'index.html'),
          admin: resolve(__dirname, 'admin/index.html')
        }
      }
    }
  };
});

