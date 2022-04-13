const { WebpackPluginServe: Serve } = require("webpack-plugin-serve")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const path = require("path")
const webpack = require("webpack")


exports.minifyJavaScript = () => ({
    optimization: {
        minimizer: [
            new TerserPlugin(),
        ],
    },
})

exports.minifyCSS = ({ options }) => ({
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(options),
        ],
    },
})

exports.devServer = () => ({
    watch: true,
    plugins: [
        new Serve({
            port: 8000,
            static: "./dist",
            liveReload: true,
            waitForBuild: true,
        }),
    ],
})

exports.generateSourceMaps = ({ type }) => ({
    devtool: type,
})

exports.extractCSS = () => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    "css-loader",
                ],
                sideEffects: true,
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
        }),
    ],
})


exports.page = () => ({
    plugins: [
        new HtmlWebpackPlugin({
            title: "Travel app",
            template: path.resolve(__dirname, "src", "client", "views", "index.html"),
            filename: "index.html",
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
})

exports.clean = () => ({
    plugins: [new CleanWebpackPlugin()],
})

const APP_SOURCE = path.resolve(__dirname, "src");

exports.loadJavaScript = () => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include: APP_SOURCE,
                loader: "babel-loader",
            },
        ],
    },
})
