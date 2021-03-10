const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    // 指定入口文件，从哪儿开始读js
    entry: './src/app.jsx',
    output: {
        // 指定通过webpack打包的文件存放的位置；__dirname表示当前目录
        path: path.resolve(__dirname, 'dist'),
        // 生成的css/js等引入路径会自动拼上publicPath
        publicPath: "/",
        // 指定通过webpack打包后的文件名称
        filename: 'js/app.js'
    },
    resolve: {
        alias: {
            page: path.resolve(__dirname, 'src/page'),
            component: path.resolve(__dirname, 'src/component')
        }
    },
    devServer: {
        contentBase: './dist',
        port: 8086,
        historyApiFallback: true
    },
    module: {
        rules: [
            // react语法的处理
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // env的意思是自动根据环境来打包
                        presets: ['env', 'react']
                    }
                }
            },
            // css文件的处理
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // sass文件的处理
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            // 加载字体
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 处理HTML文件
        new HtmlWebpackPlugin({
            // 指定模板文件路径
            template: './src/index.html'
        }),
        // 独立css文件，其中的index.css指的是生成的css文件名
        new ExtractTextPlugin("resource/[name].css"),
        // 提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            // name可以随便起名
            name: 'common',
            filename: 'js/base.js'

        })
    ]
};