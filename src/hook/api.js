const api = {
  shortLink (url, subIds) {
    return new Promise((resolve, reject) => {
      fetch(`${import.meta.env.VITE_API_URL}/shopee?input=${url}&${subIds}`)
        .then(res => res.json())
        .then(res => {
          resolve(res.data.generateShortLink.shortLink)
        })
        .catch(() => {
          reject()
        })
    })
  }
}

export default api