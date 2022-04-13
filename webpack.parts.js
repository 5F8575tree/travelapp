const { WebpackPluginServe: Serve } = require("webpack-plugin-serve")
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

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
            filename: "[name].css",
        }),
    ],
})


exports.page = ({ title }) => ({
    plugins: [
        new MiniHtmlWebpackPlugin({ context: { title } }),
    ],
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
