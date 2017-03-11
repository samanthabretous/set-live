import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import auth from '../utils/auth';
import store from '../store';
import { RESET_LOGIN } from '../actions/types';

class Logout extends Component {
  componentDidMount() {
    auth.logout();
    store.dispatch({
      type: RESET_LOGIN,
    });
    this.props.router.replace('/');
  }

  render() {
    return <p>You are now logged out</p>;
  }
}

Logout.propTypes = {
  router: PropTypes.object.isRequired,
};


export default withRouter(Logout);
