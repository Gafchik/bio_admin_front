// FILE: vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      sassVariables: 'src/sass/quasar-variables.sass'
    })
  ],
  resolve: {
    alias: {
      "@assets": path.join(__dirname, '/src/assets'),
      "@sass": path.join(__dirname, '/src/sass'),
      "@": path.join(__dirname, '/src'),
    }
  }
})
