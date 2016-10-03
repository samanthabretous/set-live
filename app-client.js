import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import App from './components/app'
import WaitingForPlayers from './components/WaitingForPlayers'
import Game from './components/Game'


ReactDOM.render(  
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={WaitingForPlayers}/>
      <Route name='game' path='game' component={Game}></Route>
    </Route> 
  </Router>, 
  document.getElementById('root')
)

