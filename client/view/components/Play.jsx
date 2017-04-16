import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';


class Play extends Component {
  componentDidMount() {
    this.props.router.replace('/');
  }

  render() {
    return <p>Please wait while our little ninjas redirect you to the correct page</p>;
  }
}

Play.propTypes = {
  router: PropTypes.object.isRequired,
};

export default withRouter(Play);
