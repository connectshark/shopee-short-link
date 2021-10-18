<template>
<div class="about">
  <div class="card">
    <figure>
      <img src="../assets/author.jpg" alt="author">
      <figcaption>
        <a href="https://github.com/connectshark" target="_blank">connectshark</a>
      </figcaption>
    </figure>
    <p class="icons">
      <a href="https://github.com/connectshark/shopee-short-link" class="icon" title="此專案" target="_blank">
        <i class='bx bxl-github'></i>
      </a>
      <a href="mailto:bobhus394@gmail.com" class="icon" title="聯繫" target="_blank">
        <i class='bx bx-mail-send'></i>
      </a>
      <a href="javascript:;" class="icon" title="分享" @click.prevent="share">
        <i class='bx bx-share-alt'></i>
      </a>
    </p>
  </div>
</div>
</template>

<script>
import { useToast } from 'vue-toastification'
export default {
  setup () {
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
    return {
      share
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';
@import '../assets/scss/color.scss';
.about{
  width: 90%;
  margin: auto;
  max-width: 600px;
  .card{
    @include box;
    .icons{
      text-align: center;
      .icon{
        font-size: 30px;
        color: $font;
        margin: 0 5px;
        transition: color .3s;
        &:hover{
          color: #333;
        }
      }
    }
    figure{
      text-align: center;
      img{
        width: 100px;
        height: 100px;
        vertical-align: middle;
        object-fit: cover;
        border-radius: 50%;
      }
      figcaption{
        a{
          font-size: 20px;
          line-height: 2;
          text-decoration: none;
          color: $font;
        }
      }
    }
  }
}
</style>