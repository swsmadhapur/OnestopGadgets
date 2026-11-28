import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'admin-routes',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url ? req.url.split('?')[0] : '';
          if (url === '/admin' || url === '/admin/') {
            const adminHtml = path.resolve(__dirname, 'public/admin/index.html');
            if (fs.existsSync(adminHtml)) {
              res.setHeader('Content-Type', 'text/html');
              res.end(fs.readFileSync(adminHtml));
              return;
            }
          }
          if (url === '/superadmin' || url === '/superadmin/') {
            const superAdminHtml = path.resolve(__dirname, 'public/superadmin/index.html');
            if (fs.existsSync(superAdminHtml)) {
              res.setHeader('Content-Type', 'text/html');
              res.end(fs.readFileSync(superAdminHtml));
              return;
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
});
