const path = require('path')

const resolve = dir => {
    return path.join(__dirname, dir)
}
module.exports = {
  //设置为空打包后不分更目录还是多级目录
  publicPath: '',
  //build编译后存放静态文件的目录
  //assetsDir: "static",

  // build编译后不生成资源MAP文件
  productionSourceMap: false,

  //开发服务,build后的生产模式还需nginx代理
  devServer: {
    open: false, //运行后自动打开浏览器
    port: 2800, //挂载端口
    // proxy: {
    //   '/api': {
    //   	target: 'https://www.fastmock.site/mock/5039c4361c39a7e3252c5b55971f1bd3/api',
    //   	ws: true,
    //   	pathRewrite: {
    //   		'^/api': '/'
    //   	}
    //   }
    // }
  },

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
    config.resolve.alias
    .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    .set('_c', resolve('src/components'));
    config.module
    .rule('js')
    .include
      .add(resolve('packages'))
      .end()
    .use('babel')   // 编译器
      .loader('babel-loader')
      .tap(option => {
        return option
      })
  },

  configureWebpack: config => {
    //性能提示
    config.performance = {
      hints: false
    }
  }

}
