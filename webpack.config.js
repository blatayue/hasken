const webpack = require('webpack')
const path = require('path')
const HappyPack = require('happypack')
// const OfflinePlugin = require('offline-plugin')
const OUT_DIR = path.resolve(__dirname, './dist')
const PORT = process.env.PORT || 9800
const BUILD = process.env.build || false

module.exports = {
  devtool: 'eval',
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
      loader: 'happypack/loader?id=jsx',
    },

    {
      test: /\.scss$/,
      exclude: path.resolve(__dirname, '/src/materialize'),
      loader: 'happypack/loader?id=style'
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader'
    },
    {
      test: /\.(png|jpg|svg)$/,
      exclude: /node_modules/,
      loader: 'url-loader'
    },
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new OfflinePlugin({
    //    ServiceWorker: BUILD ? { entry: path.resolve(__dirname, './dist/sw.js') } : null,
    //   //  AppCache: BUILD ? 
    // })
    // jsx
    new HappyPack({
      id: 'jsx',
      loaders: ['babel-loader']
    }),
    // scss
    new HappyPack ({
      id: 'style',
      loaders: [
        {
          loader: 'style-loader',
          options: {
            sourceMap: true,
            hmr: false
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
            config: {
              path: path.resolve(__dirname, './postcss.config.js')
            }
          }
        },
        {
          loader: 'resolve-url-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: { 
            sourceMap: true 
          }
        }
      ]
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      materialize_sass: 'materialize-css/sass'
    },
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules'),
    ] 
  }
}