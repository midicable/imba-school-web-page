const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const mode = process.env.NODE_ENV || 'developmet'
const devTool = mode === 'development' ? 'source-map' : undefined


module.exports = {
  mode: mode,
  devtool: devTool,
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/bundle-[contenthash].js',
    assetModuleFilename: 'images/[name][ext]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/bundle-[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'assets/images', to: 'assets/images'},
        { from: 'assets/icons', to: 'assets/icons'},
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
  devServer: {
    port: 8081,
    open: true,
    hot: false,
    liveReload: true
  }
}