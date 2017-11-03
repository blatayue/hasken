const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OUT_DIR = path.resolve(__dirname, '../dist')
module.exports = {
  devtool: 'eval',
  entry: {
      'app': [
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/index',
      ]
  },
  module: {
    rules: [{
      test: /\.jsx?$/, 
      exclude: /node_modules/, 
      loader: 'happypack/loader?id=jsx',
    },
    {
      test: /\.(png|jpg|svg)$/,
      exclude: /node_modules/,
      loader: 'url-loader'
    },
    {
        test: /\.scss$/,
        loader: 'happypack/loader?id=style'
    },
    ]
  },

 

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      images: path.resolve(__dirname, '../src/images/')
    },
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules'),
    ] 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(OUT_DIR, './index.html')
    })
  ]
}