const merge = require('webpack-merge')
const base = require('./base.config.js')
const path = require('path')
const OUT_DIR = path.resolve(__dirname, '../dist')
const OfflinePlugin = require('offline-plugin')
const webpack = require('webpack')
const HappyPack = require('happypack')

module.exports = merge.smart(base, {
    output: {
        path: OUT_DIR,
        publicPath: '/hasken/',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
            test: /\.scss$/,
            loader: 'happypack/loader?id=style'
        }
    ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HappyPack({
            id: 'jsx',
            loaders: ['babel-loader']
        }),
        // scss
        new HappyPack ({
            id: 'style',
            loaders: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
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
        new OfflinePlugin({
            ServiceWorker: { 
                entry: path.resolve(OUT_DIR, './sw.js') 
            },
        }),
    ]
})