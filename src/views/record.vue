<script setup>
import clipboard from 'copy-text-to-clipboard'
import { useLinkStore } from '../stores/link'
import { useToast } from 'vue-toastification'

const toast = useToast()
const store = useLinkStore()
const copy = url => {
  clipboard(url)
  toast.success('複製成功')
}

const del = linkIndex => {
  store.deleteLink(linkIndex)
  toast.success('刪除成功')
}
</script>

<template>
  <section class="row">
    <h2 class="font-bold text-lg md:text-xl mb-1" title="輸入網址">
      轉換紀錄
      <i class="bx bx-note"></i>
    </h2>
    <ul v-if="store.links.length > 0">
      <li
      v-for="(link, i) in store.links" :key="i"
        class="flex items-center justify-center flex-row flex-wrap py-4 border-b border-gray-200 last:border-none"
      >
        <p class="w-2/3">
          <span class="bg-gray-200 p-1 rounded-md">{{ link.url }}</span>
        </p>
        <p class="w-1/3 text-center text-xl">
          <i
            class="inline-block mx-1 bx bx-x-circle bx-tada-hover cursor-pointer active:text-yellow-700 transition"
            title="delete"
            @click="del(i)"
          ></i>
          <i
            class="inline-block mx-1 bx bx-copy-alt bx-tada-hover cursor-pointer active:text-yellow-700 transition"
            title="copy"
            @click="copy(link.url)"
          ></i>
        </p>
        <p class="w-full pt-3">
        <template
            v-for="(sub, subI) in link.subIds"
            :key="subI">
          <span
          v-if="sub"
            class="text-white p-1 m-1 rounded-lg inline-block text-xs bg-gray-600"
          >{{ sub }}</span>
        
        </template>
        </p>
      </li>
    </ul>
    <div class=" text-center" v-else>
      <p class=" text-4xl"><i class='bx bx-wink-smile bx-spin'></i></p>
      <p>無紀錄</p>
    </div>
  </section>
</template>