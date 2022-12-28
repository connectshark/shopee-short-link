import { ref, unref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

export const useShopeeLink = ({ time }) => {
  const result = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const fetchShopeeLink = ({url}) => {
    loading.value = true
    result.value = null
    error.value = null
    const subIds = `id0=${unref(time)}&id1=&id2=&id3=&id4=`
    
    fetch(API_URL + `/shopee/getShortLink?input=${url}&${subIds}`)
      .then(res => res.json())
      .then(res => {
        loading.value = false
        result.value = res.data.generateShortLink.shortLink
      })
      .catch(err => {
        loading.value = false
        const code = err[0]?.extensions?.code
        if (code === 11001) {
          error.value = '記憶文字超過50字'
        } else {
          error.value = '稍待一下再嘗試'
        }
      })
  }

  return {
    result,
    loading,
    error,
    getLink: fetchShopeeLink
  }
}