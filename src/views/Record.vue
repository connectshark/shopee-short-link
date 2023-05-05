<script setup>
import RecordLink from '../components/RecordLink.vue'
import { useLinkStore } from '../stores/link'

const store = useLinkStore()
</script>

<template>
  <section class="p-10">
    <h2 class="mb-16 text-2xl" title="紀錄">轉換紀錄🔖</h2>
    <transition name="fade" mode="out-in">
      <ul v-if="store.links.length > 0">
        <RecordLink
          v-for="(link, index) in store.links"
          :key="index"
          :url="link.url"
          :subIds="link.subIds"
          :index="index"
        />
      </ul>
      <div class="text-center" v-else>
        <p class="text-4xl">
          <i class='bx bx-block'></i>
        </p>
        <p class=" mb-4">無紀錄</p>
        <p>
          <router-link class="underline" to="/">產生連結</router-link>
        </p>
      </div>
    </transition>
  </section>
</template>
<style src="../assets/css/transition.css">

</style>