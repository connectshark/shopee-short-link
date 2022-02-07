import { fileURLToPath } from 'url'
import ViteRadar from 'vite-plugin-radar'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteRadar({
      gtm: [
        {
          id: 'GTM-PVFR7S2',
        }
      ]
    })
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
