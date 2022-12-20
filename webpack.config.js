const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './src/javascripts/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'javascripts/main.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          }
        ]
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options:{
              presets: [
                ['@babel/preset-env', {'targets': '> 10%, not dead'}],
                '@babel/preset-react'
              ],
            }
          }
        ]
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            }
          },
          {
            loader: 'sass-loader',
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg)/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        },
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     esModule: false,
          //     name: 'images/[name].[ext]'
          //   }
          // }
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              }
            }
          }
        ]
      }

    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./stylesheets/main.css"
    }),
    new HTMLWebpackPlugin({
      template: './src/templates/index.html'
    }),
    new CleanWebpackPlugin(),
  ]

}
