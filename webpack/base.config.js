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
    // {
    //   test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    //   loader: 'file-loader'
    // },
    {
      test: /\.(png|jpg|svg)$/,
      exclude: /node_modules/,
      loader: 'url-loader'
    },
    ]
  },

 

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      materialize_sass: 'materialize-css/sass'
    },
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules'),
    ] 
  },
  plugins: [
    new HtmlWebpackPlugin({
      // add css to index.html, ignore app.js chunk (already in for dev env)
      template: path.resolve(OUT_DIR, './index.html')
    })
  ]
}