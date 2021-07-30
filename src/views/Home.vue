<template>
  <div class="home">
    <Banner/>
    <section class="main">
      <div class="row">
        <h2 class="row-title">輸入網址</h2>
        <div class="row-content">
          <input type="url" placeholder="輸入網址" class="user-input" v-model="input">
        </div>
        <div class="btn-group">
          <Btn :name="'送出'" :callBack="submitHandler" :type="'submit'"/>
          <Btn :name="'清除'" :callBack="clear" :type="'clear'"/>
        </div>
      </div>
      <div class="row" v-if="loading">
        <Loading/>
      </div>
      <div class="row" v-if="result">
        <h2 class="row-title">已轉換網址</h2>
        <div class="row-content">
          <input type="tel" v-model="result" disabled class="user-input">
        </div>
        <div class="btn-group">
          <Btn :name="'複製'" :callBack="copy" :type="'copy'"/>
        </div>
      </div>
      <div class="row">
        <h3 class="row-title">填入自訂連結標記</h3>
        <div class="row-content row-sub">
          <input type="text" placeholder="subId1" class="user-input" v-model="subId1">
        </div>
        <div class="row-content row-sub">
          <input type="text" placeholder="subId2" class="user-input" v-model="subId2">
        </div>
        <div class="row-content row-sub">
          <input type="text" placeholder="subId3" class="user-input" v-model="subId3">
        </div>
        <div class="row-content row-sub">
          <input type="text" placeholder="subId4" class="user-input" v-model="subId4">
        </div>
        <div class="row-content row-sub">
          <input type="text" placeholder="subId5" class="user-input" v-model="subId5">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import Banner from '../components/banner'
import Btn from '../components/btn'
import Loading from '../components/loading'
import api from '../hook/api'

export default {
  name: 'Home',
  components: {
    Banner,
    Btn,
    Loading
  },
  setup () {
    const input = ref('')
    const subId1 = ref('')
    const subId2 = ref('')
    const subId3 = ref('')
    const subId4 = ref('')
    const subId5 = ref('')
    const result = ref('')
    const loading = ref(false)



    const clear = () => {
      input.value = ''
      subId1.value = ''
      subId2.value = ''
      subId3.value = ''
      subId4.value = ''
      subId5.value = ''
    }

    const submitHandler = () => {
      if (loading.value) return
      result.value = ''
      if (input.value === '') {
        alert('請填入內容')
        return
      }
      loading.value = true
      let str = `id0=${subId1.value}&id1=${subId2.value}&id2=${subId3.value}&id3=${subId4.value}&id4=${subId5.value}`

      const { data, loading: load } = api.shortLink(input.value, str)
      watch(load, () => loading.value = false)
      watch(data, value => {
        result.value = value
      })
    }




    const copy = () => {
      const clipboardy = require('clipboardy')
      clipboardy.write(result.value)
        .then(() => {
          alert('複製成功')
        })
        .catch(() => {
          alert('複製失敗 請通報維護工程師')
        })
    }








    return {
      input,
      subId1,
      subId2,
      subId3,
      subId4,
      subId5,
      loading,
      result,
      clear,
      copy,
      submitHandler
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/media.scss';
.home{
  .main{
    width: 90%;
    margin: auto;
    max-width: 1200px;
    position: relative;
    top: -30px;
    .row{
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      box-sizing: border-box;
      background-color: #fff;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      .row-title{
        font-size: 24px;
        line-height: 1.9;
        color: #333333;
      }
      .row-content{
        padding: 5px 0;
        .user-input{
          width: 100%;
          border: 1px solid #3DBE8A;
          color: #6e6e6e;
          font-size: 14px;
          line-height: 1.1;
          padding: 10px;
          box-sizing: border-box;
        }
      }
      .row-sub{
        width: 40%;
        margin: 0 5%;
        display: inline-block;
        transition: width .3s;
        @include desktops {
          width: 100%;
          margin: 0;
        }
      }
      .btn-group{
        text-align: center;
        padding: 20px 0 0;
      }
      .black-mode{
        background-color: #6e6e6e;
      }
    }
  }
}
</style>