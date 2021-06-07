const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devServer: {
        inline:true,
        port: 8081,
    },
    node: { fs: 'empty' },
    module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader"
          }
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
	new CopyWebpackPlugin([
      {from:'src/assets',to:'assets'},
      // {from:'src/ckeditor',to:'ckeditor'}
    ])
  ],
  output: {
    publicPath: '/',
	filename: "[name].[hash].js"
  }
};
