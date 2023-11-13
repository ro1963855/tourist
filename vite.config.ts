import { defineConfig } from 'vite'

import { URL, fileURLToPath } from 'node:url';

// https://element-plus.org/en-US/guide/quickstart.html#on-demand-import
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://unocss.dev/integrations/vite
import UnoCSS from 'unocss/vite'

import eslintPlugin from "vite-plugin-eslint"

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({ cache: false }),
    UnoCSS(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: './typings/auto-imports.d.ts',
    }),
    Components({
      resolvers: [ElementPlusResolver({
        importStyle: 'sass',
      })],
      dts: './typings/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8090,
    strictPort: true,
  },
})
