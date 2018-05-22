const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Development',
      inject: true,
      template: path.resolve('./public/index.html')
    })
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json']
  },
  devServer: {
    contentBase: './dist',
    port: 8001
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve('./src'),
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
        },
      }
    ]
  }
}
