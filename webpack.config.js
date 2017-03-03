const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    './src/index.js', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:3001'
  ],
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'bin'),
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    modules: [resolve('node_modules')],
    extensions: ['.js', '.json']
  },
  devServer: {
    contentBase: resolve(__dirname, 'bin'),
    publicPath: '/'
  },
  module: {
    noParse: /node_modules\/.bin/,
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader?modules', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader?modules', 'sass-loader']
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: /\/favicon.ico$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: resolve(__dirname, 'src/index.tmpl.html')
    })
  ]
}
