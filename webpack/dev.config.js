const path = require('path')
const merge = require('webpack-merge')
const HappyPack = require('happypack')
const PORT = process.env.PORT || 9800
const OUT_DIR = path.resolve(__dirname, '../dist')
const webpack = require('webpack')
const base = require('./base.config.js')
module.exports = merge.smart(base, {
  output: {
      path: OUT_DIR,
      publicPath: '/',
      filename: '[name].js',
  },
  
  devServer: {
      port: PORT,
      publicPath: '/',
      contentBase: OUT_DIR,
    },
  devtool: 'eval',

  plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      
      // jsx
      new HappyPack({
        id: 'jsx',
        loaders: ['babel-loader']
      }),
      // scss
      new HappyPack (
        {
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
      }
    ),
  ],
})

