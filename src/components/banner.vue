<template>
  <header class="bg-gray-800">
    <div class="text-white flex items-center justify-between max-w-3xl mx-auto p-4">
      <h1 class="text-2xl md:text-3xl font-bold">
        <router-link to="/">蝦皮短網址服務</router-link>
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
              @click.prevent="share"
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
import { useToast } from 'vue-toastification'
const route = useRoute()
const navs = [
  { name: 'bx-clipboard', url: '/record', text: '轉換紀錄', id: 'record' }
]
const toast = useToast()
const share = () => {
  if (navigator.share) {
    navigator.share({
      title: '蝦皮短網址服務',
      text: '分享給你一個蝦皮專用的縮短連結網站 試用看看',
      url: 'https://shopee.nosegates.com/',
    }).then(() => {
      toast.success('感謝分享!!')
    })
  }
}
</script>