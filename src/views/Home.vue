<template>
  <div class="home">
    <Banner/>
    <section class="main">
      <div class="row">
        <h2 class="row-title" title="輸入網址">輸入網址<i class='bx bxs-hand-down'></i></h2>
        <div class="row-content">
          <input type="url" title="蝦皮網址" placeholder="蝦皮網址" class="user-input" v-model="input" autofocus @focus="select($event)">
        </div>
        <div class="btn-group">
          <Btn :name="'送出'" :callBack="submitHandler" :type="'submit'"/>
          <Btn :name="'清除'" :callBack="clear" :type="'clear'"/>
        </div>
      </div>
      <transition name="slide-fade" mode="out-in">
        <div class="row" v-if="result">
          <h2 class="row-title" title="已轉換網址">已轉換網址<i class='bx bx-happy-beaming' ></i></h2>
          <div class="row-content">
            <input type="url" v-model="result" disabled class="user-input" :title="result">
          </div>
          <div class="btn-group">
            <Btn :name="'複製'" :callBack="copy" :type="'copy'"/>
          </div>
        </div>
      </transition>
        <div class="row" v-if="loading">
          <Loading/>
        </div>
      <div class="row">
        <h3 class="row-title" title="填入自訂連結標記">填入自訂連結標記<i class='bx bx-purchase-tag'></i></h3>
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
import { ref } from 'vue'
import Banner from '../components/banner.vue'
import Btn from '../components/btn.vue'
import Loading from '../components/loading.vue'
import api from '../hook/api'
import clipboard from 'copy-text-to-clipboard'

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

      api.shortLink(input.value, str)
        .then(res => {
          result.value = res
          loading.value = false
        })
        .catch(() => {
          alert('錯誤 請通知工程師')
          loading.value = false
        })
    }




    const copy = () => {
      clipboard(result.value)
      alert('複製成功')
    }


    const select = event => {
      event.target.select()
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
      submitHandler,
      select
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/media.scss';
@import '../assets/scss/transition.scss';
.home{
  .main{
    width: 90%;
    margin: auto;
    max-width: 600px;
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
        font-size: 20px;
        line-height: 1.9;
        font-weight: bold;
        color: #6e6e6e;
      }
      .row-content{
        padding: 5px 0;
        .user-input{
          width: 100%;
          border: 1px solid #3DBE8A;
          color: #6e6e6e;
          font-size: 16px;
          line-height: 1.5;
          padding: 10px;
          box-sizing: border-box;
          transition: border .3s;
          &:focus{
            border-radius: 5px;
          }
          &:invalid{
            border: 1px solid #f00;
          }
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