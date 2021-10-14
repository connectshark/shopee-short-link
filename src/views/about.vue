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
    </p>
  </div>
</div>
</template>

<script>
export default {
  setup () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.about{
  .card{
    width: 90%;
    margin: auto;
    max-width: 600px;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    .icons{
      text-align: center;
      font-size: 30px;
      .icon{
        color: #6e6e6e;
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
          color: #6e6e6e;
        }
      }
    }
  }
}
</style>