import React from 'react'
import {Link} from 'react-router'

import {socket} from '../../actions/socket-listeners/connections'
import store from '../../store'
import {generateUserName} from '../../actions/thunk-actions'

const Join = (props) => {
  let handleChange = (event) => {
    store.dispatch(generateUserName(event.target.value))
  };

  let join = () =>{
    socket.emit('join', {name: props.username});
  };

  return (
    <form onSubmit={join}>
      <label> Full name </label>
      <input 
        onChange={handleChange}
        className="userName" 
        placeholder="enter your full name..."
        value={props.username}
        required />
      <button className="btn btn-primary">Join</button>
    </form>
  )
  
}

export default Join