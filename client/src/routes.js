//====================
// Import React and the dependencies we need to make react router work
//====================
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import auth from './utils/auth.js'



import LandingPageContainer from './containers/landingPageContainer'


function redirectToLogin(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function redirectToDashboard(nextState, replace) {
  if (auth.loggedIn()) {
    replace('/')
  }
}

//====================
// Import the different components that will represent the different pages
// of our website.
//====================
import About from './components/About'
import AppContainer from './containers/appContainer'
import Dashboard from './components/Dashboard'
import Landing from './components/Landing'
import Login from './components/Login'
import LoginContainer from './containers/loginContainer'
import Logout from './components/Logout'
import Modal from './components/Modal'
import PageOne from './components/PageOne'
import PageTwo from './components/PageTwo'
import User from './components/User'

export default (
  <Route component={AppContainer} >
    <Route path='/how-to-play'
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, About)
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
    <Route onEnter={redirectToDashboard}>
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
      <Route path='/user/:id'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, User)
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
            cb(null, Dashboard)
          })
        }
        return require.ensure([], (require) => {
          cb(null, Landing)
        })
      }}
    >
      <IndexRoute
        getComponent={(nextState, cb) => {
          // Only load if we're logged in
          if (auth.loggedIn()) {
            return require.ensure([], (require) => {
              cb(null, PageOne)
            })
          }
          return cb()
        }}
      />
      <Route onEnter={redirectToLogin} >
        // Protected nested routes for the dashboard
        <Route path='/page2'
          getComponent={(nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, PageTwo)
            })
          }}
        />
      </Route>
    </Route>
  </Route>
)
