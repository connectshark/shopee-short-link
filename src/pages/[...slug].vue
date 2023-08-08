<template>
  <section class="p-10">
    <h2 class="mb-16 text-2xl">無此頁</h2>
    <p class=" text-center">
      <router-link to="/" class=" underline">回首頁</router-link>
    </p>
  </section>
</template>
<script setup>
import { definePage } from 'vue-router/auto'
definePage({
  name: 'notFound',
  meta: {
    title: '無頁面'
  }
})
</script>