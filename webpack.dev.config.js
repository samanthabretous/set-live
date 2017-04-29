const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./client/view/Entry.jsx'],
  output: {
    path: path.join(__dirname, 'client/public/bundle'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|app-server.js)/,
        loaders: [
          'babel?presets[]=react,presets[]=es2015'],
      },
      {
        test: /\inline.svg$/,
        loader: 'babel?presets[]=es2015,presets[]=react!svg-react',
      },
      {
        test: /\.(ico|jpg|png|gif|otf|eot|webp|woff(2)?|ttf|)(\?.*)?$/,
        loaders: ['url-loader', 'file-loader'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
        loader: 'url-loader',
      },
    ],
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  watch: true,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
