import React from 'react'
import {Link} from 'react-router'


const Join = React.createClass({

  join(){
    
    this.props.emit('join', {name:this.refs.name.value})
  },

  render() {
    return (
      <form action="javascript:void(0)" onSubmit={this.join}>
        <label> Full name </label>
        <input 
          ref="name"
          className="userName" 
          placeholder="enter your full name..."
          required />
        <button className="btn btn-primary">Join</button>
      </form>
    )
  }
})

export default Join