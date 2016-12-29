var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/www/admin/main.js',
  output: {
    path: path.resolve(__dirname, './dist/www/admin'),
    publicPath: '/admin',
    filename: 'build.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: path.join(__dirname,'./src/www/admin/'),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: path.join(__dirname,'./src/www/admin/'),
        exclude: /node_modules/
      }
    ],
    loaders: [  // 这里不是rules 尼玛又是 vue init webpack-simple 模板的坑
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, './src/www/admin/')
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  vue:{
    loaders:{
      js:'babel',
      css: 'style!css!sass'
    }
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    alias: {
      // vue: 'vue/dist/vue.js',        // 尼玛坑爹啊，必须要有啊。https://github.com/vuejs-templates/webpack/issues/215
      'vue$': 'vue/dist/vue.common.js'  // 上下两种都可以解决，坑爹啊。
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/www/admin/index.html'),
    })
  ],
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
