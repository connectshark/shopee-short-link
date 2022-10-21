<script setup>
import LineBrand from '../components/brand/LineBrand.vue'
import FacebookBrand from '../components/brand/FacebookBrand.vue'
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useLinkStore } from '../stores/link'
import { useClipboard, useShare, useDateFormat, useNow } from '@vueuse/core'
import { useShopeeLink } from '../composable/getShortLink'
import { useAutoAnimate } from '@formkit/auto-animate/vue'

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
const { loading, getLink, result, error } = useShopeeLink({ time })

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

const clearInput = () => {
  input.value = ''
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
      text: '分享一個蝦皮短網址給妳',
      url: result.value
    })
  }
}
</script>

<template>
  <form class="row mb-6" @submit.prevent="submit">
    <div>
      <h2 class="font-bold text-lg md:text-xl mb-1 inline-block align-middle" title="輸入網址">輸入網址📝</h2>
      <a href="#how"
        class=" text-sm font-normal inline-block align-middle text-stone-500 hover:text-stone-700 cursor-pointer">縮網址好處?
      </a>
    </div>

    <label class="py-2 block mb-2">
      <input type="url" title="蝦皮網址" placeholder="https://shopee.tw/" pattern="https://shopee.tw/.*"
        class=" rounded-lg p-3 w-full appearance-none placeholder:text-gray-400 outline-none invalid:ring-red-500 invalid:ring-4 ring-2 ring-purple-400 focus:ring-4 transition"
        v-model="input" autofocus @focus="select($event)" />
    </label>
    <div class="text-center">
      <input type="submit" value="送出" class="btn bg-sky-600" />
      <input type="button" value="清除" @click="clearInput" class="btn bg-gray-500" />
    </div>
  </form>
  <transition name="fade" mode="out-in">
    <section class="row mb-6" v-if="result">
      <h2 class="font-bold text-xl mb-1" title="已轉換網址">已轉換網址🎉</h2>
      <label class="py-2 block mb-2">
        <input type="url" title="蝦皮網址" readonly @dblclick="select($event)" :value="result"
          class="rounded-lg p-3 w-full bg-gray-100 outline-none ring-2 ring-green-500 transition select-text" />
      </label>
      <div class="mb-2 flex justify-evenly">
        <button type="button" class=" hover:opacity-80" @click="startShare">
          <i class='bx bx-share-alt bx-md'></i>
        </button>
        <a class=" hover:opacity-80" :href="'https://www.facebook.com/sharer/sharer.php?u=' + result" target="_blank">
          <FacebookBrand/>
        </a>
        <a class=" hover:opacity-80" :href="'https://social-plugins.line.me/lineit/share?url=' + result" target="_blank">
          <LineBrand/>
        </a>
        <button type="button" class=" hover:opacity-80" @click="copy()">
          <i v-if="copied" class='bx bx-md bxs-copy-alt'></i>
          <i v-else class='bx bx-md bx-copy-alt'></i>
        </button>
      </div>
    </section>
    <section class="row mb-6" v-else-if="loading">
      <div class="text-center">
        <i class="bx bx-loader-alt bx-md bx-spin"></i>
      </div>
    </section>
  </transition>
  <section class="row mb-6">
    <h3 class="font-bold text-xl mb-1 text-stone-600" title="填入記憶文字">填入記憶文字💡</h3>
    <p>填入<span class=" text-red-400">任意文字</span>幫助記憶該連結的內容</p>
    <p>
      可以於
      <router-link to="/record" class="path">
        <i class="bx bx-clipboard"></i>轉換紀錄
      </router-link>查看
    </p>
    <div ref="wrapperEl">
      <label class="py-2 block" v-for="(item, index) in subIds" :key="index">
        <input type="text" placeholder="任意文字" class="bar" v-model="item.value" maxlength="50" />
      </label>
      <p class=" text-center" v-if="subIds.length < 5">
        <button type="button" @click.prevent="addCol" class=" hover:opacity-80 text-stone-600">
          <i class='bx bx-md bx-list-plus'></i>
        </button>
      </p>
    </div>
  </section>
  <section class="row mb-6">
    <h3 id="how" class="font-bold text-xl mb-1 text-stone-600" title="縮網址的好處">短連結的優點</h3>
    <ul class="list-disc ml-4 text-stone-600">
      <li>點擊即開啟APP</li>
      <li>簡短成更適合社群平台的長度</li>
      <li>保留原賣場＆商品的預覽內容</li>
    </ul>
  </section>
</template>

<style src="../assets/css/transition.css"></style>
