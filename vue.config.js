module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },  
  devServer: {
    proxy: 'http://39.106.228.122:3000',
    open: true,
    disableHostCheck: true
  },
  publicPath: './'
}