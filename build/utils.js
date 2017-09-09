// nodejs自带的path模块，包含路径操作的相关方法
var path = require('path')

// 读取配置，完整写法是'../config/index.js',不写完整路径的情况下，nodejs会自动读取文件夹下的index.js，具体可查阅《深入浅出node.js》
var config = require('../config')
// webpack插件，将css文件独立出来，不将css打包到js文件中
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 获取资源路径的方法
exports.assetsPath = function (_path) {
  // 按当前环境指定对应的资源路径
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  // path.posix 是兼容所有系统的写法，path.posix.join作用等价于path.join
  // path.join 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。(摘自 http://www.runoob.com/nodejs/nodejs-path-module.html)
  return path.posix.join(assetsSubDirectory, _path)
}

// 获取css-loader的方法
exports.cssLoaders = function (options) {
  // options不存在时指定为空，保证options有值
  options = options || {}

  // 定义基本的css-loader 在接下来的generateLoaders方法中用到
  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production', // 按环境决定是否启用css压缩
      sourceMap: options.sourceMap // 按参数决定是否生成对应css的sourcemap文件
    }
  }

  // 定义基本的postcss-loader 在接下来的generateLoaders方法中用到
  var postcssLoader = {
    loader: 'postcss-loader',
    // bug: https://github.com/postcss/postcss-loader/issues/248
    options: {
      sourceMap: 'inline' // 解决方案参考 https://github.com/postcss/postcss-loader#sourcemap
    }
  }

  // 生成其他的css loader，如sass，less
  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    // 存储对应的loader数组
    var loaders = [cssLoader, postcssLoader]

    //将对应的css loader加入数组中，注意这里是loader而不是loaders。
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        }) // 合并options
      })
    }

    // 额外指定的情况时 (Extract CSS when that option is specified)
    //  生产环境需要提取CSS (which is the case during production build)
    if (options.extract) {
      // 调用extract-text-webpack-plugin插件，生成单独css
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      // 开发环境需要vue-style-loader将CSS提取到页面头部
      // 将vue-style-loader与之前的loaders合并，组成最终的loaders
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // 调用generateLoaders，返回各种css对应的loader
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }), // 启用缩进
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)  各种CSS的loader
/* 返回大致这样的数组
   [{
    test: new RegExp('\.sass$')
    use: loader
  },{
    test: new RegExp('\.less$')
    user: loader
  }]
*/
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
