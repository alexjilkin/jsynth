const path = require('path');
const context = path.resolve(__dirname, 'src');

module.exports = {
  entry: [
    './worklet/synthWorklet.js'
  ],
  context,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: path.resolve(__dirname, './src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env"
            ]
          }
        }]
      }
    ]
  },
  watch: true,
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'worklet.js'
  }
};
