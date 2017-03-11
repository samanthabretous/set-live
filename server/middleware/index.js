const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

// add all middleware to the following function:
const applyExpressMiddleware = (app) => {
  // Client
  const staticPath = path.join(__dirname, '../../client/public');
  app.use(express.static(staticPath));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../../webpack.dev.config.js');
    const compiler = webpack(config);

    app.use(webpackHotMiddleware(compiler));
    app.use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
    }));
  }

  // Enable CORS from client-side
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
};

module.exports = applyExpressMiddleware;
