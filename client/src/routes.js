//====================
// Import React and the dependencies we need to make react router work
//====================
import React from 'react';
import { Route, IndexRoute } from 'react-router';

//====================
// Import the different components that will represent the different pages
// of our website.
//====================
import AppContainer from './containers/appContainer'
import LandingPageContainer from './containers/landingPageContainer'
import GameContainer from './containers/gameContainer'

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={LandingPageContainer} />
    <Route path='game/:room' component={GameContainer}/>
  </Route> 
);
