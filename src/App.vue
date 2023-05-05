<template>
<HeaderWrapper />
<main class=" min-h-content">
  <div class="max-w-lg mx-auto pt-10 pb-20 w-11/12 grid gap-20">
    <router-view/>
  </div>
</main>
<div class=" bg-[url('./assets/svg/wave-haikei.svg')] py-10 bg-cover bg-center bg-no-repeat"></div>
<FooterWrapper/>
</template>

<script setup>
import HeaderWrapper from './components/headerWrapper.vue'
import FooterWrapper from './components/footerWrapper.vue'
import { useLinkStore } from './stores/link'
const store = useLinkStore()
store.initState()
</script>