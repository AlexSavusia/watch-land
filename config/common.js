const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        global: './global/global.js',
        main: './pages/main/main.js',
        contacts: './pages/contacts/contacts.js'
    },
    // plugins: plugins(),
    plugins: [
        new HtmlWebpackPlugin({
            template: './pages/main/main.html',
            filename: 'index.html',
            chunks: [`main`, 'global', 'vendor'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            template: './pages/contacts/contacts.html',
            filename: 'contacts.html',
            chunks: [`contacts`, 'global', 'vendor'],
            inject: 'body'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../dist')},
                {from: path.resolve(__dirname, '../src/assets/img'), to: path.resolve(__dirname, '../dist/assets/img')},
            ]
        }),
        new SpriteLoaderPlugin({ plainSprite: true })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/i,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/img/[name][ext]'
                }
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    // output: 'assets/img'
                    publicPath: 'assets/'
                }
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
}
