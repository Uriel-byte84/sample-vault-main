import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'frontend', // Le dice a Vite que use la carpeta frontend como base
  server: {
    port: 3000,     // Corre en el puerto 3000
    open: true      // Te abre el navegador automáticamente al arrancar
  },
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'frontend/index.html'),
        dashboard: resolve(__dirname, 'frontend/html/index.html'),
        register: resolve(__dirname, 'frontend/html/register.html')
      }
    }
  }
});
