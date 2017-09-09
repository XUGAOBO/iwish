var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
// 用于合并多个webpack配置文件
var merge = require('webpack-merge')

// 导入webpack基本配置
var baseWebpackConfig = require('./webpack.base.conf')

// webpack处理html的插件，可以按自义定规则生成html文件
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 用于更友好地输出webpack的警告、错误等信息
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
// 将 Hot-reload 相对路径添加到 webpack.base.conf 的 对应 entry 前
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 将webpack基本配置合并进去
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap }) // 调用styleLoaders方法，返回各种css loader
  },
  // cheap-module-eval-source-map is faster for development
  // 指定生成source-map的规则
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    // 定义全局常量量的插件，在代码中调用process.env会以config.dev.env代替
    // 注意：插件在接受字符串的值时要用JSON.stringify进行处理，如 a:'a' 要写成 a:JSON.stringify('a')
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new webpack.NoEmitOnErrorsPlugin(),
    // 根据模板生成对应的html文件
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      // 路径是相对于webpack编译时的上下文目录，说白了就是项目根目录，因此上面可以直接配置index.html，其指向的就是根目录下的index.html
      filename: 'index.html', // 生成的文件名
      template: 'index.html', // 模板文件，即根据这个模板文件生成相应的文件 , 是相对于webpack配置项output.path
      inject: true // 是否将生成的js注入 html
    }),
    new FriendlyErrorsPlugin()
  ]
})
