<template>
  <Banner />
  <main class="w-5/6 max-w-3xl mx-auto py-6 min-content">
    <router-view/>
  </main>
  <FooterWrapper/>
</template>

<script setup>
import Banner from './components/banner.vue'
import FooterWrapper from './components/footerWrapper.vue'
import { useLinkStore } from './stores/link'
const store = useLinkStore()
store.initState()
</script>