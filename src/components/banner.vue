<template>
  <div class="banner">
    <div class="banner-content">
      <h1 class="title">蝦皮短網址服務</h1>
      <p>簡單 快速 好用</p>
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
.banner{
  box-sizing: border-box;
  background-color: #FFC200;
  padding: 30px 0 60px;
  .banner-content{
    width: 90%;
    margin: auto;
    max-width: 1200px;
    color: #fff;
    text-align: center;
    .title{
      font-size: 30px;
      line-height: 1.9;
      font-weight: bold;
    }
  }
}
</style>