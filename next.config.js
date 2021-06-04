require("dotenv").config();
const webpack = require("webpack");
const withImages = require("next-images");
const { config } = require("dotenv");
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

module.exports = {
  webpack(config, options) {
    const env = { API_KEY: apiKey };
    config.plugins.push(new webpack.DefinePlugin(env));
    return config;
  },
  target: "serverless",
  distDir: "out",

};
