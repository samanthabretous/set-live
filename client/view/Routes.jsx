// ====================
// Import React and the dependencies we need to make react router work
// ====================
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import auth from './containers/login/auth';


// ====================
// Import the different components that will represent the different pages
// of our website.
// ====================
import { App, Game, Login, Home, Profile } from './containers';
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
  <Route path="/" component={App} >
    <IndexRoute component={Home} />

    <Route onEnter={redirectToLogin} >
      {/* Protected nested routes for the dashboard */}
      <Route path="play" component={Profile} />
      <Route
        path="game/:room"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, Game);
          });
        }}
      />
      <Route path="profile" component={Profile} />
    </Route>

    <Route path="how-to-play" component={HowToPlay} />
    <Route path="logout" component={Logout} />

    <Route onEnter={redirectToProfile}>
      {/* Unauthenticated routes
        * Redirect to dashboard if player is already logged in */}
      <Route
        path="login"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, Login);
          });
        }}
      />
      <Route
        path="register"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, Login);
          });
        }}
      />
    </Route>


  </Route>
);
