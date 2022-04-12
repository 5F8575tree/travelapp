const { mode } = require("webpack-nano/argv")
const {
    MiniHtmlWebpackPlugin,
} = require("mini-html-webpack-plugin")
const { WebpackPluginServe } = require("webpack-plugin-serve")

module.exports = {
    mode,
    plugins: [
        new MiniHtmlWebpackPlugin({
            context: {
                title: "travelapp",
            },
        }),
        new WebpackPluginServe({
            port: 8080,
            static: "./dist",
            liveReload: true,
            waitForBuild: true,
        }),
    ],
}