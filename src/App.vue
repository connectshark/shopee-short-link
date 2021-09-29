<template>
  <Banner/>
  <router-view></router-view>
</template>

<script>
import Banner from './components/banner.vue'
export default {
  components: {
    Banner
  }
}
</script>

<style>
#app {
  font-family: 'Roboto Mono', 'Noto Sans TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>