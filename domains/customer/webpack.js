const webpack = require("../../webpack.js");

module.exports = {
  entry: {
    "create-lambda": "./dist/create-lambda.js",
    "delete-lambda": "./dist/delete-lambda.js",
    "get-lambda":    "./dist/get-lambda.js",
    "update-lambda": "./dist/update-lambda.js",
  },
  output: {
    libraryTarget: "commonjs",
    filename:      "[name]-bundle.js", // ---> To ./dist
  },
  ...webpack,
};
