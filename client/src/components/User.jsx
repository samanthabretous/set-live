import React, { Component, PropTypes } from 'react';

class User extends Component {
  render() {
    return <h1>User: {this.props.params.id}</h1>;
  }
}

User.propTypes = {
  params: PropTypes.object.isRequired,
};

export default User;
