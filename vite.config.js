import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [vue(), VitePWA({
    includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'short shopee link',
      short_name: 'SL',
      description: 'you can short all shopee link in here',
      theme_color: '#bf4800',
      start_url: '/',
      Scope: '/',
      lang: 'zh-Hant-TW',
      "prefer_related_applications": true,
      "related_applications": [{
        "platform": "web",
        "url":"https://connectshark.github.io/"
      }],
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
  server: {
    port: 8080
  }
})