const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Điểm bắt đầu của React
  output: {
    path: path.resolve(__dirname, 'dist'), // Thư mục build
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Xử lý file .js hoặc .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // Xử lý file CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Hỗ trợ cả .js và .jsx
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // File HTML gốc
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
  },
};
