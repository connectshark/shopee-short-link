<template>
  <li class="py-4 border-b border-gray-200 last:border-none">
    <p class="mb-2">
      <span class="bg-gray-200 p-1 rounded-md">{{ props.url }}</span>
    </p>
    <p class="mb-2" v-if="props.subIds.length > 0">
      <template v-for="sub in props.subIds" :key="sub.index">
        <span v-if="sub" class="text-white p-1 m-1 rounded-lg inline-block text-xs bg-gray-600">{{ sub }}</span>
      </template>
    </p>
    <p>
      <button class="inline-block mx-1" @click="del">
        <i class="bx bx-x-circle bx-sm active:text-yellow-700 transition" title="delete"></i>
      </button>
      <button class="inline-block mx-1" @click="copy()">
        <i v-if="copied" class='bx bxs-copy-alt bx-sm'></i>
        <i v-else class="bx bx-copy-alt bx-sm" title="copy"></i>
      </button>
    </p>
  </li>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
import { useLinkStore } from '../stores/link'
import { watch } from 'vue'
import { useToast } from 'vue-toastification'

const { copied, copy } = useClipboard({
  source: props.url,
  copiedDuring: 2000
})

const store = useLinkStore()

const del = () => {
  store.deleteLink(props.index)
}

const toast = useToast()

watch(copied, value => {
  if (value) {
    toast.success('複製成功！')
  }
})

const props = defineProps({
  url: String,
  subIds: Array,
  index: Number
})
</script>