<template>
  <li class="mb-10 last:mb-0 bg-tertiary-container rounded-2xl p-6">
    <p class="mb-4">
      <span class="text-tertiary inline-block select-all">{{ props.url }}</span>
    </p>
    <p class="mb-4" v-if="props.subIds.length > 0">
      <template v-for="sub in props.subIds" :key="sub.index">
        <span v-if="sub" class="text-white p-1 m-1 rounded-lg inline-block bg-main/50">{{ sub }}</span>
      </template>
    </p>
    <p class="space-x-3">
      <button class="hover:text-primary" @click="del">
        <i class="bx bx-x-circle bx-sm" title="delete"></i>
      </button>
      <button class="relative" @click="copy()">
        <i v-if="copied" class='bx bxs-copy-alt bx-sm text-primary'></i>
        <i v-else class="bx bx-copy-alt bx-sm hover:text-primary" title="copy"></i>
        <span class="absolute bg-surface py-1 px-3 rounded-2xl top-full left-0 w-14 shadow-xl" v-show="copied">OK</span>
      </button>
    </p>
  </li>
</template>

<script setup>
import { useClipboard } from '@vueuse/core'
import { useLinkStore } from '../stores/link'

const { copied, copy } = useClipboard({
  source: props.url,
  copiedDuring: 2000
})

const store = useLinkStore()

const del = () => {
  store.deleteLink(props.index)
}

const props = defineProps({
  url: String,
  subIds: Array,
  index: Number
})
</script>