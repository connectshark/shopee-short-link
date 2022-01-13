<template>
  <Banner />
  <main class="w-5/6 max-w-3xl mx-auto py-6">
    <router-view/>
  </main>
</template>

<script setup>
import Banner from './components/banner.vue'
import { useLinkStore } from './stores/link'
const store = useLinkStore()
store.initState()
</script>