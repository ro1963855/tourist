import { defineConfig } from 'vite'

// https://element-plus.org/en-US/guide/quickstart.html#on-demand-import
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://unocss.dev/integrations/vite
import UnoCSS from 'unocss/vite'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
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
})
