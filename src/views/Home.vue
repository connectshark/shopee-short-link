<script setup>
import { computed, ref } from 'vue'
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

const share = () => {
  if (navigator.share) {
    navigator.share({
      title: '蝦皮短網址服務',
      text: '分享給你一個蝦皮短網址',
      url: result.value,
    }).then(() => {
      toast.success('感謝分享!!')
    })
  }
}
</script>

<template>
  <section class="row mb-6">
    <h2 class="font-bold text-lg md:text-xl mb-1" title="輸入網址">
      輸入網址📝
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
      <input type="button" value="送出" @click="submit" class="btn bg-sky-600" />
      <input type="button" value="清除" @click="clear" class="btn bg-gray-500" />
    </div>
  </section>
  <transition name="fade" mode="out-in">
    <section class="row mb-6" v-if="result">
      <h2 class="font-bold text-xl mb-1" title="已轉換網址">已轉換網址🎉</h2>
      <label class="py-2 block mb-2">
        <input
          type="url"
          title="蝦皮網址"
          readonly
          @dblclick="select($event)"
          :value="result"
          class="rounded-lg p-3 w-full bg-gray-100 outline-none ring-2 ring-green-500 transition select-text"
        />
      </label>
      <div class="text-center mb-2 flex items-center justify-evenly">
        <button @click="share">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
        </button>
        <a :href="'https://www.facebook.com/sharer/sharer.php?u=' + result" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48" style=" fill:#000000;"><linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"></stop><stop offset="1" stop-color="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path></svg>
        </a>
        <a :href="'https://social-plugins.line.me/lineit/share?url=' + result" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48" style=" fill:#000000;"><path fill="#00c300" d="M12.5,42h23c3.59,0,6.5-2.91,6.5-6.5v-23C42,8.91,39.09,6,35.5,6h-23C8.91,6,6,8.91,6,12.5v23C6,39.09,8.91,42,12.5,42z"></path><path fill="#fff" d="M37.113,22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108,4.772-13.108,10.637c0,5.258,4.663,9.662,10.962,10.495c0.427,0.092,1.008,0.282,1.155,0.646c0.132,0.331,0.086,0.85,0.042,1.185c0,0-0.153,0.925-0.187,1.122c-0.057,0.331-0.263,1.296,1.135,0.707c1.399-0.589,7.548-4.445,10.298-7.611h-0.001C36.203,26.879,37.113,24.764,37.113,22.417z M18.875,25.907h-2.604c-0.379,0-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687c0.379,0,0.687,0.308,0.687,0.687v4.521h1.917c0.379,0,0.687,0.308,0.687,0.687C19.562,25.598,19.254,25.907,18.875,25.907z M21.568,25.219c0,0.379-0.308,0.688-0.687,0.688s-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687s0.687,0.308,0.687,0.687V25.219z M27.838,25.219c0,0.297-0.188,0.559-0.47,0.652c-0.071,0.024-0.145,0.036-0.218,0.036c-0.215,0-0.42-0.103-0.549-0.275l-2.669-3.635v3.222c0,0.379-0.308,0.688-0.688,0.688c-0.379,0-0.688-0.308-0.688-0.688V20.01c0-0.296,0.189-0.558,0.47-0.652c0.071-0.024,0.144-0.035,0.218-0.035c0.214,0,0.42,0.103,0.549,0.275l2.67,3.635V20.01c0-0.379,0.309-0.687,0.688-0.687c0.379,0,0.687,0.308,0.687,0.687V25.219z M32.052,21.927c0.379,0,0.688,0.308,0.688,0.688c0,0.379-0.308,0.687-0.688,0.687h-1.917v1.23h1.917c0.379,0,0.688,0.308,0.688,0.687c0,0.379-0.309,0.688-0.688,0.688h-2.604c-0.378,0-0.687-0.308-0.687-0.688v-2.603c0-0.001,0-0.001,0-0.001c0,0,0-0.001,0-0.001v-2.601c0-0.001,0-0.001,0-0.002c0-0.379,0.308-0.687,0.687-0.687h2.604c0.379,0,0.688,0.308,0.688,0.687s-0.308,0.687-0.688,0.687h-1.917v1.23H32.052z"></path></svg>
        </a>
      </div>
      <div class="text-center">
        <button class="btn bg-green-700" @click="copy">複製</button>
      </div>
    </section>
    <section class="row mb-6" v-else-if="loading">
      <div class="text-center text-4xl">
        <i class="bx bx-loader-alt bx-spin"></i>
      </div>
    </section>
  </transition>
  <section class="row mb-6">
    <h3 class="font-bold text-xl mb-1" title="填入自訂連結標記">填入記憶文字💡</h3>
    <p>填入<span class=" text-red-400">任意文字</span>幫助記憶該連結的內容</p>
    <p>
      可以於
      <router-link to="/record" class="path">
        <i class="bx bx-clipboard"></i>轉換紀錄
      </router-link>查看
    </p>
    <label class="py-2 block" v-for="(item, index) in subIds" :key="index">
      <input type="text" placeholder="任意文字" class="bar" v-model="item.value" maxlength="50" />
    </label>
  </section>
</template>

<style src="../assets/css/transition.css"></style>
