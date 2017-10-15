const DashboardPlugin = require('webpack-dashboard/plugin');
const BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let filename = "dev-bundle.js";
if (process.env.NODE_ENV === "production") {
  filename = "prod-bundle.js"
}

module.exports = {
  entry: path.join(__dirname, 'src', 'index.ts'),
  output: {
    filename: filename,
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // {
      //   test: /.jsx?$/,
      //   include: [
      //     path.resolve(__dirname, 'src', "scripts")
      //   ],
      //   use: 'babel-loader',
      //   query: {
      //     presets: ['env']
      //   }
      // },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'src', "scripts")
        ],
        use: 'tslint-loader'
      },
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'src', "scripts")
        ],
        use: "ts-loader"
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src', "styles")
        ],
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{loader: "css-loader"}, {loader: "postcss-loader"}, {loader: "sass-loader"}]
        })
      },
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, 'src', "styles")
        ],
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{loader: "css-loader"}, {loader: "postcss-loader"}, {loader: "less-loader"}]
        })
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src', "styles")
        ],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{loader: "css-loader"}, {loader: "postcss-loader"}]
        })
      },
      {
        test: /\.pcss$/,
        include: [
          path.resolve(__dirname, 'src', "styles")
        ],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{loader: "css-loader"}, {loader: "postcss-loader"}]
        })
      },
  ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css', ".pcss", ".scss", ".tsx", ".ts"]
  },
  plugins: [
    //new DashboardPlugin(),
    new BitBarWebpackProgressPlugin(),
    new ExtractTextPlugin({
      filename: "page.css",
      disable: true
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src", "index.html")
    })
  ],
  devtool: 'source-map',
  devServer: {
    port: 3131,
    contentBase: path.join(__dirname, 'dist'),
    open: true
  },
};

console.log(process.env.NODE_ENV);