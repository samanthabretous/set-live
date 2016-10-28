import React from 'react'
import {Link} from 'react-router'

import {socket} from '../../actions/socket-listeners/connections'

const Join = React.createClass({
  getInitialState(){
    return {
      name: ''
    }
  },

  handleChange(event){
    this.setState({name: event.target.value})
  }, 

  join(){
    socket.emit('join', {name: this.state.name});
  },

  render() {
    return (
      <form action="javascript:void(0)" onSubmit={this.join}>
        <label> Full name </label>
        <input 
          onChange={this.handleChange}
          className="userName" 
          placeholder="enter your full name..."
          required />
        <button className="btn btn-primary">Join</button>
      </form>
    )
  }
})

export default Join