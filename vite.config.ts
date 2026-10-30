import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('three') || id.includes('@react-three')) return 'three';
          if (id.includes('recharts')) return 'recharts';
          if (id.includes('framer-motion')) return 'framer';
        },
      },
    },
  },
  server: {
    host: true,
    port: 5174,
  },
});
