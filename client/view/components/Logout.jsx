import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import auth from '../containers/login/auth';
import store from '../../redux/store';
import { RESET_LOGIN } from '../../redux/login';

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
