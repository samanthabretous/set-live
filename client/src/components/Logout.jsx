import React from 'react';
import {withRouter} from 'react-router'
import auth from '../utils/auth';
import store from '../store';
import {RESET_LOGIN} from '../actions/types'
const Logout = React.createClass({
  componentDidMount() {
    auth.logout()
    store.dispatch({
      type: RESET_LOGIN,
    })
    //this.props.router.replace('/')
  },

  render() {
    return <p>You are now logged out</p>
  }
})

export default withRouter(Logout)