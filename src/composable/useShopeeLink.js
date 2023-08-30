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
    
    try {
      const response = await fetch(API_URL + `/shopee/link`, {
        method: 'POST',
        body: JSON.stringify({
          link: url,
          time: unref(time)
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
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