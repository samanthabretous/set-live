// ====================
// Import React and the dependencies we need to make react router work
// ====================
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import auth from './utils/auth';


// ====================
// Import the different components that will represent the different pages
// of our website.
// ====================
import { AppContainer, GameContainer, LoginContainer, NavBarContainer, ProfileContainer } from './containers';
import { HowToPlay, Logout } from './components';

const redirectToLogin = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { modal: true, nextPathname: nextState.location.pathname },
    });
  } else {
    if (nextState.params.room) {
      // check to see if gsme has started, if so display game board
      auth.getGameInfo(nextState.params.room);
    } else {
      auth.getPlayerInfo();
    }
  }
};

const redirectToProfile = (nextState, replace) => {
  if (auth.loggedIn()) {
    replace('/');
  }
};


export default (
  <Route path="/" component={AppContainer} >
    <IndexRoute component={NavBarContainer} />

    <Route onEnter={redirectToLogin} >
      {/* Protected nested routes for the dashboard */}
      <Route
        path="/game/:room"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, GameContainer);
          });
        }}
      />
      <Route path="/play" component={ProfileContainer} />
      <Route path="/profile" component={ProfileContainer} />
    </Route>

    <Route path="/how-to-play" component={HowToPlay} />
    <Route path="/logout" component={Logout} />

    <Route onEnter={redirectToProfile}>
      {/* Unauthenticated routes
        * Redirect to dashboard if player is already logged in */}
      <Route
        path="/login"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, LoginContainer);
          });
        }}
      />
      <Route
        path="/register"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, LoginContainer);
          });
        }}
      />
    </Route>


  </Route>
);
