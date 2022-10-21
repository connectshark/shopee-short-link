<script setup>
import RecordLink from '../components/RecordLink.vue'
import { useLinkStore } from '../stores/link'

const store = useLinkStore()
</script>

<template>
  <section class="row">
    <h2 class="font-bold text-lg md:text-xl mb-1" title="輸入網址">轉換紀錄🔖</h2>
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
          <i class="bx bx-wink-smile bx-spin"></i>
        </p>
        <p>無紀錄</p>
      </div>
    </transition>
  </section>
</template>
<style src="../assets/css/transition.css">

</style>