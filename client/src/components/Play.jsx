import React from 'react';
import store from '../store';

const Play = React.createClass({
  componentDidMount() {
    console.log(this.props)

  },

  render() {
    return <p>Please wait while our little ninjas redirect you to the correct page</p>
  }
})

export default Play