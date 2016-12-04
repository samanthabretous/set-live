import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import store from './store'
import routes from './routes'

import ConnectionsSocketListeners from './actions/socket-listeners/connections'
import BoardSocketListeners from './actions/socket-listeners/game-connections'

require('../css/app.scss')

ConnectionsSocketListeners(store)
BoardSocketListeners (store)

ReactDOM.render(  
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('root')
)

