<template>
  <div class="home">
    <div class="user-input">
      <input type="text" v-model.trim="userInput" class="input" placeholder="貼上你的連結">
      <input type="text"
        v-for="(id, index) in subId" :key="index"
        v-model.trim="subId[index].subId" class="input" :placeholder="id.placeholder">
    </div>
    <input type="button" value="送出" @click="submit" class="btn">
    <input type="button" value="清除" @click="userInput = ''" class="btn">
    <input type="button" value="新增subId" @click="addSubId" class="btn">
    <div class="res-data">
      <input type="text" disabled v-model="resData" class="input">
    </div>
    <input type="button" value="快速複製" @click="copy" class="btn">
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      userInput: '',
      resData: '不可修改',
      subId: [],
    }
  },
  methods: {
    addSubId () {
      const length = this.subId.length + 1
      if (length > 5) return
      this.subId.push({
        subId: '',
        placeholder: 'subId' + length
      })
    },
    copy () {
      const clipboardy = require('clipboardy')
      clipboardy.write(this.resData)
        .then(() => {
          alert('複製成功')
        })
        .catch(() => {
          alert('複製失敗 請通報維護工程師')
        })
    },
    submit () {
      if (this.userInput === '') {
        alert('請填入內容')
        return
      }
      let str = ''
      this.subId.forEach((item, index) => {
        str += 'id' + index + '=' + item.subId + '&'
      })
      fetch(`${process.env.VUE_APP_URL}?input=${this.userInput}&${str}`)
        .then(res => res.json())
        .then(res => {
          this.resData = res.data.generateShortLink.shortLink
        })
        .catch(() => alert('請求錯誤 請通知工程師處理'))
    }
  }
}
</script>

<style lang="scss" scoped>
.input{
  font-size: 24px;
  width: 80%;
  max-width: 1200px;
  line-height: 2;
  text-align: center;
}
.btn{
  margin: 20px;
  border: none;
  font-size: 30px;
  line-height: 2;
  border-radius: 10px;
  background-color: #F1CB4E;
  &:last-child{
    color: #fff;
    background-color: #645CA0;
  }
}
</style>
