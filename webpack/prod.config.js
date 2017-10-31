const merge = require('webpack-merge')
const base = require('./base.config.js')
const path = require('path')
const OUT_DIR = path.resolve(__dirname, '../dist')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const HappyPack = require('happypack')

module.exports = merge.smart(base, {
    output: {
        path: OUT_DIR,
        publicPath: '/',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('happypack/loader?id=style')
        }
    ]
    },
    plugins: [
        new UglifyJSPlugin(),
        new HappyPack({
            id: 'jsx',
            loaders: ['babel-loader']
        }),
        // scss
        new HappyPack ({
            id: 'style',
            loaders: [
              'css-loader',
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
        new OfflinePlugin({
            ServiceWorker: { 
                entry: path.resolve(OUT_DIR, './sw.js') 
            },
        }),
        new ExtractTextPlugin('style.css'),
    ]
})