import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router'
import { createStore } from 'redux';
import reducer from './reducers/MainReducer'


const store = createStore(reducer)


ReactDOM.render(  
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('root')
)

