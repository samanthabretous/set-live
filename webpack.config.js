const path = require('path');

module.exports = {
  entry: ["./client/src/app-client.js" ],
  output: {
    path: path.join(__dirname, "client/public/"),
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|app-server.js)/,
        loaders: [
          'babel?presets[]=react,presets[]=es2015'],
      },
      { 
        test: /\.svg$/, 
        loader: 'babel?presets[]=es2015,presets[]=react!svg-react' 
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
