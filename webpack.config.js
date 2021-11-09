const MiniCssExtractPlugin = require ('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
    mode: 'development',
    entry: [
        '@babel/polyfill', 
        path.resolve(__dirname, './src/main.js'),
        path.resolve(__dirname, './src/styles/main.scss')
    ],
    output: {
        path: path.resolve(__dirname, './public'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'images': path.resolve(__dirname, 'src/assets/img'),
            'icons': path.resolve(__dirname, 'src/assets/icons')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css'

        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, './src/assets/img'),
                    to: path.resolve(__dirname, 'public/assets/images')
                },
                {
                    from: path.resolve(__dirname, './src/assets/icons'),
                    to: path.resolve(__dirname, 'public/assets/icons')
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'

                ]
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]'
                }
            }
        ]  
    },
    devServer: {
        static: path.resolve(__dirname, './public/assets'),
        hot: true
    }
}