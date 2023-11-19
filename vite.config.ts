import { defineConfig } from 'vite'

import { URL, fileURLToPath } from 'node:url';

import ElementPlus from 'unplugin-element-plus/vite'

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
    ElementPlus({})
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
