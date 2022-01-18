<script setup>
const copyright = `Copyright©2022 All Rights Reserved.`
</script>

<template>
  <footer class="bg-gray-800 text-white py-2 text-center">
    <p class="text-sm max-w-3xl mx-auto">{{ copyright }}</p>
    <p class="max-w-3xl mx-auto">
      <a
        href="mailto:bobhus394@gmail.com"
        class="inline-block transition hover:underline active:underline mx-1.5 active:scale-110"
        title="聯繫"
        target="_blank"
      >chambers
        <i class="bx bx-mail-send"></i>
      </a>
    </p>
  </footer>
</template>