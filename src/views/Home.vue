<template>
  <section class="main">
    <div class="row">
      <h2 class="row-title" title="輸入網址">輸入網址<i class='bx bxs-hand-down'></i></h2>
      <div class="row-content">
        <input type="url" title="蝦皮網址" placeholder="https://shopee.tw/" pattern="https://shopee.tw/.*" class="user-input" v-model="input" autofocus @focus="select($event)">
      </div>
      <div class="btn-group">
        <Btn :name="'送出'" :callBack="submitHandler" :type="'submit'"/>
        <Btn :name="'清除'" :callBack="clear" :type="'clear'"/>
      </div>
    </div>
    <div class="row" v-if="loading || result">
      <template v-if="result">
        <h2 class="row-title" title="已轉換網址">已轉換網址<i class='bx bx-happy-beaming' ></i></h2>
        <div class="row-content">
          <input type="url" v-model="result" disabled class="user-input" :title="result">
        </div>
        <div class="btn-group">
          <Btn :name="'複製'" :callBack="copy" :type="'copy'"/>
        </div>
      </template>
      <Loading v-else/>
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
import store from '../store'
import { useToast } from 'vue-toastification'

export default {
  name: 'Home',
  components: {
    Btn,
    Loading
  },
  setup () {
    const toast = useToast()
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
      toast.info('清除')
    }

    const submitHandler = () => {
      if (loading.value) return
      result.value = ''
      if (input.value === '') {
        toast.warning('請填入蝦皮網址')
        return
      } else if (!input.value.match(/https\:\/\/shopee\.tw/)) {
        toast.warning('非蝦皮網址')
        return
      }
      loading.value = true

      let str = ''
      subIds.value.forEach((item, index) => {
        str += `id` + index + '=' + item.value + '&'
      })

      api.shortLink(input.value, str)
        .then(res => {
          result.value = res
          const arr = subIds.value.map(item => item.value)
          store.commit('addLink', {
            url: res,
            subids: [...arr]
          })
          loading.value = false
        })
        .catch(() => {
          loading.value = false
          toast.error('錯誤請通知工程師')
        })
    }



    const copy = () => {
      clipboard(result.value)
      toast.success('複製成功')
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
@import '../assets/scss/mixin.scss';
@import '../assets/scss/media.scss';
@import '../assets/scss/color.scss';
@import '../assets/scss/transition.scss';
.main{
  width: 90%;
  margin: auto;
  max-width: 600px;
  .row{
    @include box;
    .row-title{
      font-size: 20px;
      line-height: 2;
      font-weight: bold;
      color: $font;
    }
    .row-content{
      .user-input{
        font-family: 'Roboto Mono', monospace;
        width: 100%;
        border: none;
        -webkit-appearance: none;
        box-shadow: 0 0 0 1.5px #3DBE8A;
        color: $font;
        &::placeholder{
          color: $holder;
        }
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
          box-shadow: 0 0 0 5px #f22;
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
      background-color: $font;
    }
  }
}
</style>