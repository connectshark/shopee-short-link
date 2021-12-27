<template>
  <div class="banner">
    <div class="banner-content">
      <h1 class="title">
        <router-link to="/">蝦皮短網址服務</router-link>
      </h1>
      <nav class="nav">
        <ul>
          <li v-for="item in navs" :key="item.url">
            <router-link :to="item.url">
              <i class="bx" :class="item.name"></i>
              <span>{{ item.text }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
const navs = [
  { name: 'bxs-pen', url: '/about', text: '作者' },
  { name: 'bx-clipboard', url: '/record', text: '轉換紀錄' }
]
</script>



<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/media.scss";
.banner {
  box-sizing: border-box;
  background-color: $main;
  margin-bottom: 20px;
  .banner-content {
    width: 90%;
    margin: auto;
    max-width: 800px;
    color: #fff;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    .title {
      a {
        display: block;
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.5rem;
        line-height: 2;
        @include mobile {
          font-size: 2rem;
        }
        transition: font .3s ease;
      }
      &:hover {
        a {
          text-decoration: underline;
        }
      }
    }
    .nav {
      ul {
        li {
          display: inline-block;
          margin: 0 .5rem;
          transition: margin .3s ease;
          @include mobile {
          margin: 0 1rem;
          }
          a {
            display: block;
            color: #fff;
            background-color: $main;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s ease;
            &:hover {
              color: $sub;
            }
          }
          .router-link-active {
              color: $sub;
          }
        }
      }
    }
  }
}
</style>