import { ref, unref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

export default function ({ time }) {
  const result = ref('')
  const loading = ref(false)
  const error = ref('')

  const fetchShopeeLink = async ({ url }) => {
    loading.value = true
    result.value = ''
    error.value = ''
    const subIds = `id0=${unref(time)}&id1=2023&id2=&id3=&id4=`
    
    try {
      const response = await fetch(API_URL + `/shopee/getShortLink?input=${url}&${subIds}`)
      if (!response.ok) {
        error.value = '稍後一下再嘗試'
      } else {
        const { data } = await response.json()
        result.value = data.generateShortLink.shortLink
      }
      loading.value = false
    } catch (err) {
      error.value = '發生一點問題'
      loading.value = false
    }
  }

  return {
    result,
    loading,
    error,
    getLink: fetchShopeeLink
  }
}