const merge = require('webpack-merge')
const base = require('./base.config.js')
const path = require('path')
const OUT_DIR = path.resolve(__dirname, '../dist')
// const OfflinePlugin = require('offline-plugin')
const webpack = require('webpack')
const HappyPack = require('happypack')

module.exports = merge.smart(base, {
    output: {
        path: OUT_DIR,
        publicPath: '/hasken/',
        filename: '[name].js',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HappyPack({
            id: 'jsx',
            loaders: ['babel-loader']
        }),
        // scss
        new HappyPack (
            {
            id: 'style',
            loaders: [
                'style-loader',
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
                  config: {
                    path: path.resolve(__dirname, './postcss.config.js')
                  }
                }
              },
              
              'resolve-url-loader',
              {
                loader: 'sass-loader',
                options: { 
                  sourceMap: true 
                }
              }
            ]
        }),
        // new OfflinePlugin(),
    ]
})