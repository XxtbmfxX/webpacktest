const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPluging = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
     // Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: "./src/index.js",
    // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    output: {
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
        path: path.resolve(__dirname, "dist"),
        // filename le pone el nombre al archivo final
        filename: "[name].[contenthash].js",
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
        extensions: [".js"],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        rules: [
            {
                //declara que extensiones de archivo se aplicaran a loader----usando expresiones regulares
                test: /\.m?js$/, //utiliza culquier extension mjs o js 
                //omitir caprpetas especificas
                exclude: /node_modules/,
                //loader a aplicar
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.s?css$/i,
                use: [MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000, //limite de tamaño
                        mimeType: "application/font-woff", //tipo de dato
                        name: "[name].[contenthash].[ext]",//nombre de salida
                        outputPath: "./assets/fonts/", //donde se va a guardar
                        publicPath: "../assets/fonts/",
                        esModule: false,
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html' 
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),

        new CopyPluging({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: 'assets/images'
                }
            ]
        }),
        new Dotenv(),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(), //css
            new TerserPlugin(), //js
        ]
    }
}