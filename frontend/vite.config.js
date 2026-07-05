import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'frontend',
  server: {
    port: 5173,
    open: false,
    // Esto hace que si entrás a la raíz, te redirija automáticamente al login
    proxy: {
      '^/$': {
        target: 'http://localhost:5173/html/login.html',
        bypass: (req, res) => {
          res.writeHead(302, { Location: '/html/login.html' });
          res.end();
        }
      }
    }
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        login: resolve(__dirname, 'frontend/html/login.html'),
        dashboard: resolve(__dirname, 'frontend/html/admin-dashboard.html'),
        register: resolve(__dirname, 'frontend/html/register.html')
      }
    }
  }
});