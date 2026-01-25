import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  root: 'src',
  publicDir: resolve(__dirname, 'src/public'),
  resolve: {
    alias: [
      { 
        find: '@', 
        replacement: fileURLToPath(new URL('./src', import.meta.url)) 
      },
    ],
  },
});
