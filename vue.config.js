module.exports = {
  css: {
    sourceMap: false
  },

  publicPath: process.env.NODE_ENV === 'production'
    ? '/shopee-short-link/'
    : '/',

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
