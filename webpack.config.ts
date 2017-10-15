import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";

const config = {
  entry: {
    app: path.join(__dirname, "src", "index.ts")
    // vendor: [] // ["jquery", "bootstrap"]
  },
  output: {
    filename: "[name]-[chunkhash].js",
    path: path.resolve(__dirname, "dist")
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
      // {
      //   enforce: "pre",
      //   test: /\.tsx?$/,
      //   include: [
      //     path.resolve(__dirname, "src", "scripts")
      //   ],
      //   use: "tslint-loader"
      // },
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, "src", "scripts")
        ],
        use: "ts-loader"
      },
      {
        test: /\.(scss|sass)$/,
        include: [
          path.resolve(__dirname, "src", "styles"),
          path.resolve(__dirname, "node_modules")
        ],
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  importLoader: 2,
                  sourceMap: true
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
        })
      },
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, "src", "styles"),
          path.resolve(__dirname, "node_modules")
        ],
        use: [
          {
            loader: "css-loader",
            options: {
              importLoader: 2,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(css|pcss)$/,
        include: [
          path.resolve(__dirname, "src", "styles"),
          path.resolve(__dirname, "node_modules")
        ],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            options: {
              importLoader: 1,
              sourceMap: true
            }
          }, {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          }]
        })
      }
  ]
  },
  resolve: {
    extensions: [".json", ".js", ".jsx", ".css", ".pcss", ".scss", ".sass", ".tsx", ".ts"]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons-[hash].js",
      chunks: ["app"] // chunks: ["venoor", "app"]
    }),
    new ExtractTextPlugin({
      filename: "[name]-[hash].css",
      disable: false
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src", "index.html"),
      chunks: ["app"] // chunks: ["commons", "app"]
    }),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname, "src", "images"),
        to: path.resolve(__dirname, "dist", "images")
      }, {
        from: path.resolve(__dirname, "src", "fonts"),
        to: path.resolve(__dirname, "dist", "fonts")
      }, {
        from: path.resolve(__dirname, "src", "pages"),
        to: path.resolve(__dirname, "dist", "pages")
      }]
  )],
  devtool: "source-map",
  devServer: {
    port: 3131,
    contentBase: path.join(__dirname, "dist"),
    open: true
  }
};

module.exports = config;