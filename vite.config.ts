import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/repetitor24/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
