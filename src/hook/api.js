const API_URL = import.meta.env.VITE_API_URL

const api = {
  shortLink (url, subIds) {
    return new Promise((resolve, reject) => {
      fetch(API_URL + `/shopee?input=${url}&${subIds}`)
        .then(res => res.json())
        .then(res => {
          resolve(res.data.generateShortLink.shortLink)
        })
        .catch(err => {
          const code = err[0]?.extensions?.code
          if (code === 11001) {
            reject('記憶文字超過50字')
          } else {
            reject('稍待一下再嘗試')
          }
        })
    })
  }
}

export default api