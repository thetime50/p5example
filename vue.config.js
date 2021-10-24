module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/p5example/dist/'
    : '/',
  configureWebpack: {
    externals: {
      // 'vue': 'Vue',
      // 'vue-router': 'VueRouter',
      // 'element-ui': 'element-ui'

      p5: 'p5',
    },
  },
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= 'p5example'
        return args
      })
  },
};
