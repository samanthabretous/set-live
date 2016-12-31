import React from 'react';
import {withRouter} from 'react-router'


const Play = React.createClass({
  componentDidMount() {
    console.log(this.props)
    this.props.router.replace('/')

  },

  render() {
    return <p>Please wait while our little ninjas redirect you to the correct page</p>
  }
})

export default withRouter(Play)