// 引入utils
var utils = require('./utils')
// 引入配置文件
var config = require('../config')
// 当前是否是生成环境
var isProduction = process.env.NODE_ENV === 'production'

// vue-loader的options
module.exports = {
  loaders: utils.cssLoaders({ // 设置cssLoaders方法的参数
    sourceMap: isProduction ?
      config.build.productionSourceMap :
      config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
