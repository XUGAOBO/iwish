var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')

// 复制文件(文件夹)的插件
var CopyWebpackPlugin = require('copy-webpack-plugin')

// webpack处理html的插件，可以按自义定规则生成html文件
var HtmlWebpackPlugin = require('html-webpack-plugin')

// webpack插件，将css文件独立出来，不将css打包到js文件中
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// webpack压缩css的插件
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// 指定当前运行环境为"production"
var env = config.build.env

// 将webpack基本配置合并进去
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ // 调用styleLoaders方法，生成各种css loader
      sourceMap: config.build.productionSourceMap,
      extract: true // 指定生成单独的css文件，不与js混合
    })
  },
  // 指定生成source-map的规则
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {// 指定生产环境中的输出文件路径
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[name].[id].[chunkhash].js') // chunkFilename请参考 http://react-china.org/t/webpack-output-filename-output-chunkfilename/2256/2
  },
  plugins: [
    // 注意：插件在接受字符串的值时要用JSON.stringify进行处理，如 a:'a' 要写成 a:JSON.stringify('a')
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // 指定生产环境，以便在压缩时可以让 UglifyJS 自动删除代码块内的警告语句。
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 压缩js的插件
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      beautify: false,
      comments: false,
      compress: {
        drop_debugger: true,
        drop_console: true,
        warnings: false
      },
      sourceMap: false // 生成source-map
    }),
    // 生成独立css文件的插件
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].css')
    }),
    // 用来压缩独立的css文件，尽可能的复用不同组件相同的css
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // 根据模板生成对应的html文件
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index, // 生成的文件名
      template: 'index.html',
      inject: true, // 是否将生成的js注入 html
      minify: {
        removeComments: true, // 去除文件注释
        collapseWhitespace: true, // 去除空白格
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // 使用CommonsChunkPlugin必须配置
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // 将模块中的公共代码分离成独立的一个文件。将来自node_modules下的模块提取到vendor.js（一般来讲都是外部库，短时间不会发生变化）（参考 https://segmentfault.com/a/1190000006808865）
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // 公共模块被使用的最小次数。比如配置为3，也就是同一个模块只有被3个以外的页面同时引用时才会被提取出来作为common chunks。(引用自 http://www.cnblogs.com/souvenir/p/5012552.html)
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // static文件夹中的内容复制到指定路径
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubStatic,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  // webpack压缩插件
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240, // 当大于这个值时启用压缩
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  // 可视化打包情况，参阅 https://npm.taobao.org/package/webpack-bundle-analyzer
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

// 导出webpackConfig
module.exports = webpackConfig
