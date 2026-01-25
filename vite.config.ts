import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { 
        find: '@', 
        replacement: fileURLToPath(new URL('./src', import.meta.url)) 
      },
    ],
  },
});
