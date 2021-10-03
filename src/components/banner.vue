<template>
  <div class="banner">
    <div class="banner-content">
      <h1 class="title">
        <router-link to="/">蝦皮短網址服務</router-link>
      </h1>
      <transition name="slide-fade" mode="out-in">
      <p class="slogan" v-if="show === 0">簡單</p>
      <p class="slogan" v-else-if="show === 1">快速</p>
      <p class="slogan" v-else>好用</p>
      </transition>
      <nav class="nav">
        <ul>
          <li v-for="item in navs" :key="item.url">
            <router-link :to="item.url">{{item.name}}</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
export default {
  setup() {
    const show = ref(null)

    onMounted(() => {
      show.value = 0
    })

    watch( show , value => {
      setTimeout(() => {
        if (value > 2) {
          show.value = 0
        } else {
          show.value += value + 1
        }
      }, 2000)
    })
    return {
      show,
      navs: [
        {
          name: '作者',
          url: '/about'
        },
        {
          name: '轉換紀錄',
          url: '/record'
        }
      ]
    }
  }
}
</script>



<style lang="scss" scoped>
@import '../assets/scss/color.scss';
@import '../assets/scss/transition.scss';
.banner{
  box-sizing: border-box;
  background-color: $main;
  padding: 30px 0 0;
  margin-bottom: 20px;
  .banner-content{
    width: 90%;
    margin: auto;
    max-width: 1200px;
    color: #fff;
    text-align: center;
    .title{
      a{
        display: block;
        color: #fff;
        text-decoration: none;
        font-size: 30px;
        line-height: 1.9;
        font-weight: bold;
      }
      &:hover{
        a{
          text-decoration: underline;
        }
      }
    }
    .nav{
      padding: 10px 0 0;
      ul{
        li{
          display: inline-block;
          margin: 0 10px;
          a{
            display: block;
            color: #fff;
            background-color: $main;
            padding: 10px;
            border-radius: 3px 3px 0 0;
            text-decoration: none;
            font-weight: bold;
            transition: background .3s, color .3s;
            &:hover{
              background-color: #fff;
              color: $main;
            }
          }
          .router-link-active{
            background-color: #fff;
            color: $main;
          }
        }
      }
    }
    .slogan{
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
    }
  }
}
</style>