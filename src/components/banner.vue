<template>
  <div class="banner">
    <div class="banner-content">
      <h1 class="title">
        <router-link to="/">蝦皮短網址服務</router-link>
      </h1>
      <p class="slogan">簡單 快速 好用</p>
      <nav class="nav">
        <ul>
          <li>
            <router-link to="/about">作者</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.banner{
  box-sizing: border-box;
  background-color: #B45309;
  padding: 30px 0 60px;
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
          a{
            display: block;
            background-color: #fff;
            padding: 10px;
            border-radius: 3px;
            color: #B45309;
            text-decoration: none;
            font-weight: bold;
            transition: background .3s, color .3s;
            &:hover{
              color: #fff;
              background-color: #B45309;
            }
          }
        }
      }
    }
    .slogan{
      font-size: 16px;
      line-height: 1.1;
      font-weight: 500;
    }
  }
}
</style>