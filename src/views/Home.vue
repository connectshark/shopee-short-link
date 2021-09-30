<template>
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
      <div class="row-content row-sub" v-for="(item, index) in subIds" :key="index">
        <input type="text" :placeholder="'subId' + (index + 1)" class="user-input" v-model="item.value">
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import Btn from '../components/btn.vue'
import Loading from '../components/loading.vue'
import api from '../hook/api'
import clipboard from 'copy-text-to-clipboard'

export default {
  name: 'Home',
  components: {
    Btn,
    Loading
  },
  setup () {
    const input = ref('')
    const subIds = ref([
      {
        value: ''
      },
      {
        value: ''
      },
      {
        value: ''
      },
      {
        value: ''
      },
      {
        value: ''
      }
    ])
    const result = ref('')
    const loading = ref(false)



    const clear = () => {
      input.value = ''
      subIds.value.forEach(item => item.value === '')
    }

    const submitHandler = () => {
      if (loading.value) return
      result.value = ''
      if (input.value === '') {
        alert('請填入內容')
        return
      }
      loading.value = true

      let str = ''
      subIds.value.forEach((item, index) => {
        str += `id` + index + '=' + item.value + '&'
      })

      alert(str)
      // api.shortLink(input.value, str)
      //   .then(res => {
      //     result.value = res
      //     loading.value = false
      //   })
      //   .catch(() => {
      //     alert('錯誤 請通知工程師')
      //     loading.value = false
      //   })
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
      subIds,
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
      .user-input{
        font-family: 'Roboto Mono', monospace;
        width: 100%;
        border: none;
        box-shadow: 0 0 0 1.5px #3DBE8A;
        color: #6e6e6e;
        font-size: 16px;
        line-height: 1.5;
        padding: 10px;
        border-radius: 3px;
        box-sizing: border-box;
        transition: box-shadow .3s;
        border-radius: 5px;
        outline: none;
        &:focus{
          box-shadow: 0 0 0 5px #3DBE8A;
        }
        &:invalid{
          border: 1px solid #f00;
        }
      }
    }
    .row-sub{
      width: 40%;
      margin: 0 5% 20px;
      display: inline-block;
      transition: width .3s;
      @include desktops {
        width: 100%;
        margin: 0 0 20px;
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
</style>