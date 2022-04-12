const { WebpackPluginServe: Serve } = require("webpack-plugin-serve")
const { MiniHtmlWebpackPlugin } = require("mini-html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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

exports.loadCSS = () => ({
    module: {
        rules: [
            {
                test: /\.css$/, use: ["style-loader", "css-loader"],
            },
        ],
    },
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