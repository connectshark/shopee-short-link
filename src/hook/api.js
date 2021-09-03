import { ref } from 'vue'

const api = {
  shortLink (url, subIds) {
    const loading = ref(true)
    const data = ref(undefined)
    fetch(`${process.env.VUE_APP_URL}/shopee?input=${url}&${subIds}`)
      .then(res => res.json())
      .then(res => {
        data.value = res.data.generateShortLink.shortLink
        loading.value = false
      })
      .catch(() => {
        alert('請求錯誤 請通知工程師處理')
        loading.value = false
        data.value = ''
      })
    return {
      loading,
      data
    }
  }
}

export default api