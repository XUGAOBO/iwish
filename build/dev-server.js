// 检查 Node 和 npm 版本
// require('./check-versions')()

// 引入配置文件
var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 用于打开完整的模块，（也可以打开文件）。参考 https://www.npmjs.com/package/opn
var opn = require('opn')
var path = require('path')
// web 开发框架
var express = require('express')

// 导入webpack
var webpack = require('webpack')

// 代理组件（可以解决跨域的问题）参考 http://www.jianshu.com/p/95b2caf7e0da
var proxyMiddleware = require('http-proxy-middleware')

// 引入webpack配置
var webpackConfig = require('./webpack.dev.conf')

// 指定监听的端口
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// 指定本地服务的域名
var host = config.dev.host || 'http://localhost:'

// 是否自动在浏览器中打开页面，如果config中没有设置，则为false（不自动打开）
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser

// 读取config中代理的配置
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// 启动 webpack 进行编译
var compiler = webpack(webpackConfig)

// 启动 webpack-dev-middleware，将 编译后的文件暂存到内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// 热加载组件
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})

// 当html-webpack-plugin插件指定的template改变时，重新加载页面
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 循环proxyTable对象，创建对应的代理
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  // 应用代理
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

//应用webpack-dev-middleware
// serve webpack bundle output
app.use(devMiddleware)

// 应用热加载插件
// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
// 构建静态资源路径
// path.posix 是兼容所有系统的写法，path.posix.join作用等价于path.join
// path.join 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。(摘自 http://www.runoob.com/nodejs/nodejs-path-module.html)
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubStatic)
console.log('posix staticPath', staticPath)
app.use(staticPath, express.static('./static'))

// 构造uri
var uri = host + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')

  // 当开启了自动打开地址，且当前环境是testing
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
