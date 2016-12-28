import React from 'react';
import auth from '../utils/auth';
import store from '../store';
import {RESET_LOGIN} from '../actions/types'
const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
    store.dispatch({
      type: RESET_LOGIN,
    })
  },

  render() {
    return <p>You are now logged out</p>
  }
})

export default Logout