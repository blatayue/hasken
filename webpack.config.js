const webpack = require('webpack')
const path = require('path')
const OfflinePlugin = require('offline-plugin')
const OUT_DIR = path.resolve(__dirname, './dist')
const PORT = process.env.PORT || 9800
const BUILD = process.env.build || false

module.exports = {
  devtool: 'source-map',
  entry: {
      'app': [
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/index',
      ]
  },
  output: {
    path: OUT_DIR,
    publicPath: BUILD ? '/hasken/' : '/',
    filename: '[name].js',
  },

  devServer: {
    port: PORT,
    publicPath: '/',
    contentBase: OUT_DIR,
  },

  module: {
    rules: [{
        test: /\.jsx?$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
    },

    {
      test: /\.scss$/,
      use: [{
          loader: 'style-loader',
          options: {
            hnr: false,
            sourceMap: true,
          }
      },

      {
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          importLoaders: 1,
          sourceMap: true,
        }
      },

      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: [ 
            require('autoprefixer')(),
          ],
        }
      },
      
      {
        loader: 'sass-loader',
        options: { 
          sourceMap: true 
        }
      }]
    }]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new OfflinePlugin({
      ServiceWorker : {
        entry: path.resolve(__dirname, './dist/sw.js')
      },
      externals: []
    })
  ],

  resolve: {
    extensions: ['.js', '.jsx']
  }
}