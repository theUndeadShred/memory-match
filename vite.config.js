import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '^/public/.*': {
        target: 'http://localhost:5173',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
