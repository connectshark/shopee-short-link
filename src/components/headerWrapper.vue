<template>
  <header>
    <div class="flex items-center justify-between max-w-lg mx-auto py-10 w-11/12">
      <h1>
        <router-link class=" flex items-center gap-3" to="/">
          <img class="w-5" src="../assets/icon.png" alt="app logo">
          <span class="font-bold">蝦英雄</span>
        </router-link>
      </h1>
      <nav>
        <ul class="space-x-4">
          <li v-for="item in navs" :key="item.url" class="inline-block">
            <router-link
              :to="item.url"
              class=" hover:underline"
              :class="{ 'underline': item.id === route.name }"
            >
              <i class="bx bx-xs" :class="item.name"></i>
              <span>{{ item.text }}</span>
            </router-link>
          </li>
          <li class="inline-block mx-2">
            <a
              href="javascript:;"
              class="block transition mx-1.5 hover:scale-110 active:scale-110"
              title="分享此站給所有人"
              @click.prevent="startShare"
            >
              <i class="bx bx-share-alt"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useShare } from '@vueuse/core'
const route = useRoute()

const navs = [
  { name: 'bx-clipboard', url: '/record', text: '紀錄', id: 'record' }
]


const { share, isSupported } = useShare()
const startShare = () => {
  if (isSupported) {
    share({
      title: '蝦英雄 | 蝦皮短網址服務',
      text: '分享給你一個蝦皮短網址網站',
      url: 'https://shopee.nosegates.com/'
    })
  }
}
</script>