import { ref } from 'vue'

export default () => {
  const loading = ref(false)
  const data = ref(null)
  const API_URL = import.meta.env.VITE_NOTIFY_URL
  const doFetch = async ({ link, result }) => {
    loading.value = true
    const response = await fetch(API_URL + `/notify/shopee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link: link,
        result: result
      })
    })
    const res = await response.text()
    data.value = res
    loading.value = false
  }

  return {
    loading,
    doFetch
  }
}