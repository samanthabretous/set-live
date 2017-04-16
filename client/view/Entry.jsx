import React from 'react';
import ReactDOM from 'react-dom';
import 'gsap';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import routes from './routes';

import ConnectionsSocketListeners from '../redux/actions/connections';
import BoardSocketListeners from '../redux/actions/gameConnections';
import '../css/app.scss';

ConnectionsSocketListeners(store);
BoardSocketListeners(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root'));
