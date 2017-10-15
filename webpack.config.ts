import * as CleanWebpackPlugin from "clean-webpack-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";

let filen = "dev-bundle.js";
if (process.env.NODE_ENV === "production") {
  filen = "prod-bundle.js";
}

module.exports = {
  entry: {
    app: path.join(__dirname, "src", "index.ts")
    // common: [] // ["jquery", "bootstrap"]
  },
  output: {
    filename: "[name]-[chunk].js",
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
          use: ["css-loader", "postcss-loader"]
        })
      }
  ]
  },
  resolve: {
    extensions: [".json", ".js", ".jsx", ".css", ".pcss", ".scss", ".sass", ".tsx", ".ts"]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ExtractTextPlugin({
      filename: "page.css",
      disable: false
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
      }]
  )],
  devtool: "source-map",
  devServer: {
    port: 3131,
    contentBase: path.join(__dirname, "dist"),
    open: true
  }
};
