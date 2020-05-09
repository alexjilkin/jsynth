const webpack = require('webpack');

const path = require('path');
const context = path.resolve(__dirname, 'src');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './index.js'
  ],
  context,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            "plugins": [
              ["react-css-modules", {
                context,
                "filetypes": {
                  ".scss": {
                    "syntax": "postcss-scss",
                    "plugins": [
                      "postcss-nested"
                    ]
                  }
                },
                "exclude": "node_modules",
                generateScopedName: '[path]___[name]__[local]___[hash:base64:5]',
                "webpackHotModuleReloading": true
              }],
            ],
          }
        }]
      }, 
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'),
        use: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      }, 
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, './src'),
        use: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass-loader'
        ]
      }

    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: ['node_modules', 'src']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true
  }
};
