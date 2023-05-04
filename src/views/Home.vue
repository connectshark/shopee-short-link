<script setup>
import LineBrand from '../components/brand/LineBrand.vue'
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useLinkStore } from '../stores/link'
import { useClipboard, useShare, useDateFormat, useNow } from '@vueuse/core'
import { useShopeeLink } from '../composable/getShortLink'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { useQRCode } from '@vueuse/integrations/useQRCode'

const [ wrapperEl ] = useAutoAnimate()
const toast = useToast()
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
const select = event => {
  event.target.select()
}

const time = useDateFormat(useNow(), 'MMoDDoHHomm')
const {
  loading,
  getLink,
  result,
  error
} = useShopeeLink({ time })

watch(result, value => {
  if (value !== null) {
    store.addLink({
      url: value,
      subIds: subIds.value.map(item => item.value)
    })
    input.value = ''
    subIds.value.forEach(item => item.value = '')
  }
})
watch(error, value => {
  if (value !== null) {
    toast.error(value)
  }
})

const qrcode = useQRCode(result)

const submit = () => {
  if (loading.value) return
  if (input.value === '') {
    toast.warning('請填入蝦皮網址')
    return
  } else if (!input.value.match(/https\:\/\/shopee\.tw/)) {
    toast.warning('非蝦皮網址')
    return
  }

  getLink({ url: input.value })
}

const { copied, copy } = useClipboard({
  source: result,
  copiedDuring: 2000
})

watch(copied, value => {
  if (value) {
    toast.success('複製成功！')
  }
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
    <input type="url" title="蝦皮網址" placeholder="https://shopee.tw/" pattern="^https://shopee\.tw/.*"
      class=" rounded-lg p-3 pr-8 w-full appearance-none placeholder:text-gray-400 outline-none invalid:ring-red-500 invalid:ring-4 ring-2 ring-primary focus:ring-4 transition"
      v-model="input" autofocus @focus="select($event)" />
    <button type="button" v-show="input" @click.stop="input = ''" class=" absolute right-1 top-5">
      <i class='bx bx-x-circle bx-sm align-middle'></i>
    </button>
  </label>
  <div class="text-center space-x-4">
    <input type="submit" value="送出" class="bg-primary text-surface py-2 px-5 rounded-2xl cursor-pointer transition-shadow hover:shadow-md" />
  </div>
</form>
<transition name="fade" mode="out-in">
  <section class=" bg-tertiary-container p-10 rounded-2xl" v-if="result">
    <h2 class="mb-4 text-xl" title="已轉換網址">已轉換網址🎉</h2>
    <label class="py-2 block mb-4">
      <input type="url" title="蝦皮網址" readonly @dblclick="select($event)" :value="result"
        class="select-text rounded-lg p-3 w-full appearance-none outline-none bg-gray-100 ring-2 ring-secondary" />
    </label>
    <div class="mb-2 flex items-center justify-evenly">
      <a class="hover:opacity-80" :href="qrcode" download="qrcode" title="下載QRcode">
        <i class='bx bx-qr-scan bx-sm align-middle'></i>
      </a>
      <button type="button" class="hover:opacity-80" @click="startShare">
        <i class='bx bx-share-alt bx-sm align-middle'></i>
      </button>
      <a class="hover:opacity-80" :href="'https://www.facebook.com/sharer.php?u=' + result" target="_blank" title="分享至FB">
        <i class='bx bxl-facebook-circle bx-sm align-middle'></i>
      </a>
      <a class="hover:opacity-80" :href="'https://social-plugins.line.me/lineit/share?url=' + result" target="_blank" title="分享至Line">
        <LineBrand/>
      </a>
      <button type="button" class="hover:opacity-80" @click="copy()" title="直接複製URL">
        <i v-if="copied" class='bx bxs-copy-alt bx-sm align-middle'></i>
        <i v-else class='bx bx-copy-alt bx-sm align-middle'></i>
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
  <div ref="wrapperEl">
    <label class="py-2 block mb-4" v-for="(item, index) in subIds" :key="index">
      <input type="text" placeholder="任意文字" class="rounded-lg p-3 appearance-none placeholder:text-gray-400 outline-none w-full ring-2 ring-secondary" v-model="item.value" maxlength="50" />
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
