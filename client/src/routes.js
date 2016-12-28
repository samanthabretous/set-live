//====================
// Import React and the dependencies we need to make react router work
//====================
import React from 'react';
import { Route, IndexRoute, Link } from 'react-router';

import auth from './utils/auth.js'


//====================
// Import the different components that will represent the different pages
// of our website.
//====================
import AppContainer from './containers/appContainer';
import GameContainer from './containers/gameContainer';
import HowToPlay from './components/HowToPlay';
import LoginContainer from './containers/loginContainer'
import Logout from './components/Logout'
import Modal from './components/Modal'
import ProfileContainer from './containers/profileContainer'
import PageTwo from './components/PageTwo'
import User from './components/User'



function redirectToLogin(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { modal: true, nextPathname: nextState.location.pathname }
    })
  }
}

function redirectToProfile(nextState, replace) {
  if (auth.loggedIn()) {
    replace('/')
  } 
}

export default (
  <Route component={AppContainer} >
    <Route path='/how-to-play'
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, HowToPlay)
        })
      }}
    />
    <Route path='/logout'
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, Logout)
        })
      }}
    />
    <Route onEnter={redirectToProfile}>
      {/* Unauthenticated routes
        * Redirect to dashboard if player is already logged in */}
      <Route path='/login'
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, LoginContainer)
          })
        }}
      />
    </Route>
    

    <Route onEnter={redirectToLogin} >
      {/* Protected routes that don't share the dashboard UI*/}
      <Route path='/play'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, ProfileContainer)
          })
        }}
      />
    </Route>

    <Route path='/'
      getComponent={(nextState, cb) => {
        // Share the path
        // Dynamically load the correct component
        if (auth.loggedIn()) {
          
          return require.ensure([], (require) => {
            cb(null, ProfileContainer)
          })
        }
        return require.ensure([], (require) => {
          cb(null, HowToPlay)
        })
      }}
    >
      <IndexRoute
        getComponent={(nextState, cb) => {
          // Only load if we're logged in
          if (auth.loggedIn()) {
            return require.ensure([], (require) => {
              cb(null, ProfileContainer)
            })
          }
          return cb()
        }}
      />
      <Route onEnter={redirectToLogin} >
        // Protected nested routes for the dashboard
        <Route path='/game/:room'
          getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, GameContainer)
            })
          }}
        />
      </Route>
    </Route>
  </Route>
)
