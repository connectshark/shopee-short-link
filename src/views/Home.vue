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
      const input = this.userInput
      const ids = this.subId.map(id => id.subId)
      while (ids.length < 5) {
        ids.push('')
      }
      let str = `["${ids[0]}","${ids[1]}","${ids[2]}","${ids[3]}","${ids[4]}"]`
      const graphQLParams = {
        "query": `mutation {
          generateShortLink(input:{originUrl: "${input}",subIds:${str}}){
            shortLink
          }
        }`
      }
      var appId = process.env.VUE_APP_APPID
      var secret = process.env.VUE_APP_SECRET
      var ts = Math.ceil(new Date().getTime()/1000)

      var payload = JSON.stringify(graphQLParams);
      var factor = appId+ts+payload+secret;

      var sign = CryptoJS.SHA256(factor).toString(CryptoJS.enc.Hex);

      var headers = {
        "Content-Type": "application/json",
        "Authorization": "SHA256 Credential="+appId+", Timestamp="+ts+", Signature="+sign
      }
      const self = this
      fetch(process.env.VUE_APP_URL, {
        method: "post",
        headers: headers,
        body: payload,
        credentials: "include",
      }).then(function (response) {
        return response.json()
      }).then(function (responseBody) {
        self.resData = responseBody.data.generateShortLink.shortLink
      }).catch(() => {
        alert('連結有誤')
      })
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
