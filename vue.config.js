module.exports = {
  css: {
    sourceMap: false
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'https://open-api.affiliate.shopee.tw/graphql',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  lintOnSave: false
}
