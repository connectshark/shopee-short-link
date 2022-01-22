<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import api from '../hook/api'
import dayjs from 'dayjs'
import { useLinkStore } from '../stores/link'
import clipboard from 'copy-text-to-clipboard'
const toast = useToast()
const store = useLinkStore()

const input = ref('')
const result = ref('')
const subIds = ref([
  {
    value: ''
  },
  {
    value: ''
  },
  {
    value: ''
  },
  {
    value: ''
  },
  {
    value: ''
  }
])
const select = event => {
  event.target.select()
}

const loading = ref(false)
const submit = () => {
  if (loading.value) return
  result.value = ''
  if (input.value === '') {
    toast.warning('請填入蝦皮網址')
    return
  } else if (!input.value.match(/https\:\/\/shopee\.tw/)) {
    toast.warning('非蝦皮網址')
    return
  }
  loading.value = true

  const time = dayjs().format('MMoDDoHHomm')
  let str = `id0=${time}&id1=&id2=&id3=&id4=`

  api.shortLink(input.value, str)
    .then(res => {
      result.value = res
      const arr = subIds.value.map(item => item.value)
      store.addLink({
        url: res,
        subIds: [...arr]
      })
      loading.value = false
    })
    .catch(err => {
      loading.value = false
      toast.error(err)
    })
}

const copy = () => {
  clipboard(result.value)
  toast.success('複製成功')
}

const clear = () => {
  input.value = ''
  subIds.value.forEach(item => item.value = '')
  toast.info('清除')
}
</script>

<template>
  <section class="row mb-6">
    <h2 class="font-bold text-lg md:text-xl mb-1" title="輸入網址">
      輸入網址
      <i class="bx bxs-hand-down"></i>
    </h2>
    <label class="py-2 block mb-2">
      <input
        type="url"
        title="蝦皮網址"
        placeholder="https://shopee.tw/"
        pattern="https://shopee.tw/.*"
        class="rounded-lg p-3 w-full appearance-none placeholder:text-gray-400 outline-none invalid:ring-red-500 invalid:ring-4 ring-2 ring-green-500 focus:ring-4 transition"
        v-model="input"
        autofocus
        @focus="select($event)"
      />
    </label>
    <div class="text-center">
      <input type="button" value="送出" @click="submit" class="btn bg-sky-500" />
      <input type="button" value="清除" @click="clear" class="btn bg-gray-500" />
    </div>
  </section>
  <transition name="fade" mode="out-in">
    <section class="row mb-6" v-if="result">
      <h2 class="font-bold text-xl mb-1" title="已轉換網址">
        已轉換網址
        <i class="bx bx-happy-beaming"></i>
      </h2>
      <label class="py-2 block mb-2">
        <input
          type="url"
          title="蝦皮網址"
          disabled
          @dblclick="select($event)"
          :value="result"
          class="rounded-lg p-3 w-full disabled:bg-gray-100 outline-none invalid:ring-red-500 invalid:ring-4 ring-2 ring-green-500 focus:ring-4 transition"
        />
      </label>
      <div class="text-center">
        <input type="button" value="複製" @click="copy" class="btn bg-green-700" />
      </div>
    </section>
    <section class="row mb-6" v-else-if="loading">
      <div class="text-center text-4xl">
        <i class="bx bx-loader-alt bx-spin"></i>
      </div>
    </section>
  </transition>
  <section class="row">
    <h3 class="font-bold text-xl mb-1" title="填入自訂連結標記">
      填入記憶文字
      <i class="bx bx-purchase-tag"></i>
    </h3>
    <p>填入<span class=" text-red-400">任意文字</span>幫助記憶該連結的內容</p>
    <p>
      可以於
      <router-link to="/record" class="path">
        <i class="bx bx-clipboard"></i>轉換紀錄
      </router-link>查看
    </p>
    <label class="py-2 block" v-for="(item, index) in subIds" :key="index">
      <input type="text" placeholder="任意文字(中英表情符號皆可)" class="bar" v-model="item.value" maxlength="50" />
    </label>
  </section>
</template>

<style src="../assets/css/transition.css"></style>
