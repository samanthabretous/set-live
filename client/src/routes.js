//====================
// Import React and the dependencies we need to make react router work
//====================
import React from 'react';
import { Route, IndexRoute } from 'react-router';

//====================
// Import the different components that will represent the different pages
// of our website.
//====================
import AppContainer from './app/appContainer'
import LandingPageContainer from './landingPage/landingPageContainer'
import GameContainer from './game/gameContainer'

//Redux
import store from './store'
import {generateUserNameAsync} from './actions/thunk-actions'

const getRandomName = () => {store.dispatch(generateUserNameAsync())}

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={LandingPageContainer} onEnter={getRandomName}/>
    <Route path='game/:room' component={GameContainer}/>
  </Route> 
);
