import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import store from './store'
import routes from './routes'

import ConnectionsSocketListeners from './actions/connections'
import BoardSocketListeners from './actions/gameConnections'

import '../css/app.scss';
import 'gsap';


ConnectionsSocketListeners(store)
BoardSocketListeners (store)

ReactDOM.render(  
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('root')
)

