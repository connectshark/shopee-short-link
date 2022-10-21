<template>
  <header class="bg-neutral-700">
    <div class="text-white flex items-center justify-between max-w-lg mx-auto p-4">
      <h1 class="text-2xl font-bold">
        <router-link to="/">
          <img class=" inline-block align-middle" src="../assets/icon.png" alt="icon">
          <span class=" hover:scale-105 inline-block align-middle transition-transform duration-1000">蝦英雄</span>
        </router-link>
      </h1>
      <nav class="nav">
        <ul>
          <li v-for="item in navs" :key="item.url" class="inline-block mx-2">
            <router-link
              :to="item.url"
              class="path"
              :class="{ 'text-yellow-400 underline': item.id === route.name }"
            >
              <i class="bx" :class="item.name"></i>
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
  { name: 'bx-clipboard', url: '/record', text: '轉換紀錄', id: 'record' }
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