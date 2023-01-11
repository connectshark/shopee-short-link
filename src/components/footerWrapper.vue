<script setup>
const copyright = `Copyright©2022-2023 All Rights Reserved.`
</script>

<template>
  <footer class="bg-slate-900 text-white py-10 text-center text-sm">
    <p class="max-w-3xl mx-auto">{{ copyright }}</p>
    <p class="max-w-3xl mx-auto">
      <a
        href="mailto:bobhus394@gmail.com"
        class="inline-block transition hover:underline active:underline mx-1.5 active:scale-110"
        title="聯繫"
        target="_blank"
      >Chambers
        <i class="bx bx-mail-send"></i>
      </a>
    </p>
  </footer>
</template>