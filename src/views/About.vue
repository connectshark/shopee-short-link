<script setup>
import { useToast } from 'vue-toastification'
const toast = useToast()
const share = () => {
  if (navigator.share) {
    navigator.share({
      title: '蝦皮短網址服務',
      text: '縮短蝦皮網站上的連結',
      url: 'https://shopee.nosegates.com/',
    }).then(() => {
      toast.success('感謝分享!!')
    })
  }
}
</script>

<template>
  <section class=" w-48 mx-auto rounded-2xl overflow-hidden bg-white text-center">
    <figure>
      <img src="../assets/author.jpg" class="rounded-br-[50px] w-full h-40 object-cover" alt="author" />
      <figcaption>
        <a href="mailto:bobhus394@gmail.com">chambers</a>
      </figcaption>
    </figure>
    <div class="py-4 text-2xl">
      <a
        href="mailto:bobhus394@gmail.com"
        class="inline-block transition mx-1.5 hover:scale-110 active:scale-110"
        title="聯繫"
        target="_blank"
      >
        <i class="bx bx-mail-send"></i>
      </a>
      <a
        href="javascript:;"
        class="inline-block transition mx-1.5 hover:scale-110 active:scale-110"
        title="分享"
        @click.prevent="share"
      >
        <i class="bx bx-share-alt"></i>
      </a>
    </div>
  </section>
</template>