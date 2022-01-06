<template>
  <div class=" bg-gray-800">
    <div class="text-white flex items-center justify-between max-w-3xl mx-auto p-4">
      <h1 class="text-2xl md:text-3xl font-bold">
        <router-link to="/">蝦皮短網址服務</router-link>
      </h1>
      <nav class="nav">
        <ul>
          <li v-for="item in navs" :key="item.url" class=" inline-block mx-2">
            <router-link :to="item.url" class="path" :class="{ 'text-yellow-400 underline' : item.id === route.name }">
              <i class="bx" :class="item.name"></i>
              <span>{{ item.text }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const navs = [
  { name: 'bxs-pen', url: '/about', text: '作者', id: 'about' },
  { name: 'bx-clipboard', url: '/record', text: '轉換紀錄', id: 'record' }
]
</script>