<script setup>
import { ref, watch } from 'vue'
import { useLinkStore } from '../stores/link'
import { useClipboard, useShare, useDateFormat, useNow } from '@vueuse/core'
import useShopeeLink from '../composable/useShopeeLink'
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { definePage } from 'vue-router/auto'
import useNotify from '../composable/useNotify'

definePage({
  name: 'home'
})

const store = useLinkStore()

const input = ref('')

const addCol = () => {
  if ( subIds.value.length >= 5 ) {
    return
  }
  subIds.value.push({ value: '' })
}

const subIds = ref([
  { value: '' }
])

const vFocus = {
  mounted: (el) => el.focus()
}

const select = event => {
  event.target.select()
}

const time = useDateFormat(useNow(), 'MMoDDoHHomm')
const {
  loading,
  createLink,
  result,
  error
} = useShopeeLink({ time })


const {
  doFetch: notify
} = useNotify()

watch(result, value => {
  if (value) {
    const hadSubID = subIds.value.some(item => item.value) 
    store.addLink({
      url: value,
      subIds: hadSubID ? subIds.value.map(item => item.value) : [],
      id: Date.now()
    })
    notify({ link: input.value , result: value })
    input.value = ''
    subIds.value.forEach(item => item.value = '')
  }
})

const qrcode = useQRCode(result)

const submit = async () => {
  if (loading.value) return
  await createLink({ url: input.value })
}

const { copied, copy } = useClipboard({
  source: result,
  copiedDuring: 2000
})

const { share, isSupported } = useShare()

const startShare = () => {
  if (isSupported) {
    share({
      title: '蝦英雄 | 蝦皮短網址服務',
      text: '分享一個蝦皮短網址',
      url: result.value
    })
  }
}
</script>

<template>
<form class="bg-primary/10 p-10 rounded-2xl" @submit.prevent="submit">
  <h2 class="mb-4 text-2xl" title="輸入網址">輸入網址📝</h2>
  <p class="mb-4">
    <a href="#how" class="text-sm cursor-pointer ">縮網址好處?</a>
  </p>
  <label class="py-2 block mb-4 relative">
    <input type="url" title="蝦皮網址" :disabled="loading" placeholder="https://shopee.tw/" pattern="^https://shopee\.tw/.*" required class=" rounded-lg p-3 pr-8 w-full appearance-none ring-2 outline-none focus:ring-4 ring-primary transition disabled:bg-surface-variant" v-model.trim="input" @focus="select($event)" v-focus />
    <button type="button" v-show="input && !loading" @click.stop="input = ''" class=" absolute right-1 top-5">
      <i class='bx bx-x-circle bx-sm align-middle'></i>
    </button>
  </label>
  <p v-if="error">{{ error }}</p>
  <div class="text-center">
    <input type="submit" value="送出" class="bg-primary text-surface py-2 px-5 rounded-2xl cursor-pointer transition-shadow hover:shadow-lg" />
  </div>
</form>
<transition name="fade" mode="out-in">
  <section class=" bg-tertiary-container p-10 rounded-2xl" v-if="result">
    <h2 class="mb-4 text-xl" title="已轉換網址">已轉換網址🎉</h2>
    <label class="py-2 block mb-4">
      <input type="url" title="蝦皮網址" readonly @dblclick="select($event)" :value="result"
        class="select-text rounded-lg p-3 w-full appearance-none outline-none ring-2 read-only:bg-surface-variant ring-secondary" />
    </label>
    <div class="mb-2 flex items-center justify-evenly">
      <a class="hover:text-primary" :href="qrcode" download="qrcode" title="下載QRcode">
        <i class='bx bx-qr-scan bx-sm align-middle'></i>
      </a>
      <button type="button" class="hover:text-primary" @click="startShare">
        <i class='bx bx-share-alt bx-sm align-middle'></i>
      </button>
      <a class="hover:text-primary" :href="'https://www.facebook.com/sharer.php?u=' + result" target="_blank" title="分享至FB">
        <i class='bx bxl-facebook-circle bx-sm align-middle'></i>
      </a>
      <a class="hover:text-primary" :href="'https://social-plugins.line.me/lineit/share?url=' + result" target="_blank" title="分享至Line">
        <img src="../assets/svg/line.svg" alt="line logo">
      </a>
      <button type="button" class="relative" @click="copy()" title="直接複製URL">
        <i v-if="copied" class='bx bxs-copy-alt bx-sm text-primary'></i>
        <i v-else class="bx bx-copy-alt bx-sm hover:text-primary" title="copy"></i>
        <span class="absolute bg-surface py-1 px-3 rounded-2xl top-full left-0 w-14 shadow-xl" v-show="copied">OK</span>
      </button>
    </div>
  </section>
  <section class="bg-primary/10 p-10 rounded-2xl" v-else-if="loading">
    <div class="text-center">
      <i class="bx bx-loader-alt bx-md bx-spin"></i>
    </div>
  </section>
</transition>
<section class="bg-primary/10 p-10 rounded-2xl">
  <h3 class="mb-4 text-xl" title="填入記憶文字">記憶文字💡</h3>
  <p class="mb-4 text-sm">填入任意文字幫助記憶該連結的內容可以於<router-link to="/record" class="path"><i class="bx bx-clipboard"></i>紀錄</router-link>查看</p>
  <div>
    <label class="py-2 block mb-4" v-for="(item, index) in subIds" :key="index">
      <input type="text" placeholder="任意文字" class="rounded-lg p-3 appearance-none placeholder:text-main/50 outline-none w-full ring-2 ring-secondary" v-model.trim="item.value" maxlength="50" />
    </label>
    <p class=" text-center" v-if="subIds.length < 5">
      <button type="button" @click.prevent="addCol" class=" hover:opacity-80">
        <i class='bx bx-md bx-list-plus'></i>
      </button>
    </p>
  </div>
</section>
<section class="p-10">
  <h3 id="how" class="mb-4 text-xl" title="縮網址的好處">短連結的優點</h3>
  <ul class="list-disc ml-4">
    <li class=" mb-2">點擊即開啟APP</li>
    <li class=" mb-2">簡短成更適合社群平台的長度</li>
    <li class=" mb-2">保留原賣場＆商品的預覽內容</li>
  </ul>
</section>
</template>

<style src="../assets/css/transition.css"></style>
