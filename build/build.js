// 检查 Node 和 npm 版本
require('./check-versions')()

// 指定为生产环境
process.env.NODE_ENV = 'production'

// 实现node.js 命令行环境的 loading效果， 和显示各种状态的图标等。参考 https://segmentfault.com/q/1010000008330147
var ora = require('ora')

// 用于删除文件(文件夹)的模块
var rm = require('rimraf')

// 引入path模块
var path = require('path')

// 美化控制台输出的模块，参阅 https://github.com/chalk/chalk
var chalk = require('chalk')

// 引入webpack
var webpack = require('webpack')

// 引入配置文件
var config = require('../config')

// 引入webpack配置
var webpackConfig = require('./webpack.prod.conf')

// 显示进度条
var spinner = ora('building for production...')
spinner.start()

// 删除dist/static
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err

  // 编译配置文件
  webpack(webpackConfig, function (err, stats) { // 编译完成时的回调函数

    if (err) throw err

    // 输出设置
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    spinner.stop() // 进度条停止

    // 输出结果。调用chalk美化输出，
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
