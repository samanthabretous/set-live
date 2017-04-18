import React from 'react';
import ReactDOM from 'react-dom';
import 'gsap';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import routes from './Routes';

// style
import '../css/entry.scss';
// socket
import ConnectionsSocketListeners from './socket';
ConnectionsSocketListeners(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('root'));
