const { mode } = require("webpack-nano/argv")
const { merge } = require("webpack-merge")
const parts = require("./webpack.parts");
const path = require("path");


const commonConfig = merge([
    {
        entry: "./src/index.js"
    },
    {
        output: {
            path: path.resolve(__dirname, "dist"),
            libraryTarget: "var",
            library: "$",
            assetModuleFilename: "images/[name][extname]"
        },
    },
    parts.clean(),
    parts.page(),
    parts.extractCSS(),
    parts.loadJavaScript(),
    parts.loadImages(),
]);

const productionConfig = merge([
    parts.minifyJavaScript(),
    parts.minifyCSS({ options: { minimizerOptions: { preset: ["default", { discardComments: { removeAll: true } }] } } }),
]);

const developmentConfig = merge([
    {
        entry: [
            "webpack-plugin-serve/client", "./src/index.js"]
    },
    parts.devServer(),
]);

const getConfig = (mode) => {
    switch (mode) {
        case "production":
            return merge(commonConfig, productionConfig, { mode });
        case "development":
            return merge(commonConfig, developmentConfig, { mode });
        default:
            throw new Error(`Unknown mode: ${mode}`);
    }
};

module.exports = getConfig(mode);