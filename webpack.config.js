const { mode } = require("webpack-nano/argv")
const { merge } = require("webpack-merge")
const parts = require("./webpack.parts");
const path = require("path");


const commonConfig = merge([
    {
        entry: "./src/index.js",
    },
    parts.page({ title: "Travel App" }),
    parts.extractCSS(),
    parts.loadJavaScript(),
]);

const productionConfig = merge([
    parts.generateSourceMaps({ type: "source-map" }),
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