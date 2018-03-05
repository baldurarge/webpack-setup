var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPathAssetsFix = require('html-webpack-plugin-assets-fix');

const extractStyle = new ExtractTextPlugin('style.css');
const extractLib = new ExtractTextPlugin('lib.css');


var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
})

module.exports = {
    devServer: {
        contentBase: [ '/' ],
        watchContentBase: true
      },
    entry:{
        frontpage: './src/js/frontpage.js'
             
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: './js/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/i,
                include: path.resolve(__dirname, './src/css'),
                loader: extractLib.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.html$/,
                use:['html-loader']
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader?limit=1024&name=img/[name].[ext]'
                        // options: {
                        //     name: '[name].[ext]',
                        //     output: 'img'
                        // }
                    }
                ]
            }
        ]
    },
    plugins: [
        extractPlugin,
        new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jQuery",
        "windows.jQuery": "jquery"
    }),
    // new CopyWebpackPlugin([
    //     { from: 'src/img', to: 'img' }
    //     ]),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        chunks:['frontpage']
    }),
    new HtmlWebpackPlugin({
        filename: '404.html',
        template: 'src/404.html'
    }),
    new CleanWebpackPlugin(['dist'])
    ]
}