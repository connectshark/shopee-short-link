import { fileURLToPath } from 'url'
import ViteRadar from 'vite-plugin-radar'
import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    ViteRadar({
      gtm: [
        {
          id: 'GTM-PVFR7S2',
        }
      ]
    }),
    VueRouter()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080
  }
})
