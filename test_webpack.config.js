const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

let filename = "dev-bundle.js";
if (process.env.NODE_ENV === "production") {
  filename = "prod-bundle.js"
}

module.exports = {
  entry: {
    app: path.join(__dirname, 'src', 'index.ts'),
    //common: [] // ["jquery", "bootstrap"]
  },
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
            use: ["css-loader", "postcss-loader", "sass-loader"]
        })
      },
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, 'src', "styles")
        ],
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader", "postcss-loader", "less-loader"]
        })
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src', "styles")
        ],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
        })
      },
      {
        test: /\.pcss$/,
        include: [
          path.resolve(__dirname, 'src', "styles")
        ],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
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
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "src", "images"),
      to: path.resolve(__dirname, "dist", "images")
    }, {
      from: path.resolve(__dirname, "src", "fonts"),
      to: path.resolve(__dirname, "dist", "fonts")
    }],
    {
      ignore: [
        // "*.txt"
      ]
    })
  ],
  devtool: 'source-map',
  devServer: {
    port: 3131,
    contentBase: path.join(__dirname, 'dist'),
    open: true
  },
};
