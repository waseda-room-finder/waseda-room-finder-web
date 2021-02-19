const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// use .env
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "wasedatime",
    projectName: "syllabus",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|otf|svg)(\?[a-z0-9=.]+)?$/,
          loader: "url-loader",
        },
      ],
    },
    plugins: webpackConfigEnv.isLocal
      ? [
          new webpack.DefinePlugin({
            "process.env": JSON.stringify(dotenv.config().parsed),
          })
        ]
      : [
          new webpack.EnvironmentPlugin(["REACT_APP_API_BASE_URL"])
        ],
  });
};
