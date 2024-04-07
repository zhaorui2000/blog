import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        globals: { vue: 'vue' },
      },
      external: ['vue'],
    },
    outDir: resolve(__dirname, 'lib'),
    lib: {
      entry: resolve(__dirname, './src/main.js'),
      name: '@blog/ui',
      fileName: 'index',
    },
  },
});
