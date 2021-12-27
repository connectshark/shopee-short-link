<template>
  <Banner/>
  <router-view></router-view>
</template>

<script setup>
import Banner from './components/banner.vue'
import { useStore } from 'vuex'
const store = useStore()
store.dispatch('init')
</script>

<style>
#app {
  font-family: 'Roboto Mono', 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1rem;
}
</style>