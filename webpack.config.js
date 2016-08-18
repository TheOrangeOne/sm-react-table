var webpack = require('webpack');
var path = require('path');

module.exports = {
  debug: true,
  noInfo: true,
  resolve: {
    root: [
      path.resolve('./src')
    ]
  },
  entry: {
    app: ['./src/smtable.js'],
    vendors: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.join(__dirname, 'lib'),
    publicPath: '',
    filename: 'index.js'
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      include: path.join(__dirname, 'src'),
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendors", /* filename= */"vendors.bundle.js"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
