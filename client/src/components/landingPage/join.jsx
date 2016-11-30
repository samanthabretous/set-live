import React from 'react'
import store from '../../store'
import {generateUserName} from '../../actions/thunk-actions'

const Join = (props) => {
  let handleChange = (event) => {
    store.dispatch(generateUserName(event.target.value))
  };
  return (
    <form action="javascript:void(0)">
      <label> Full name </label>
      {props.username ?
      <input 
        onChange={handleChange}
        className="userName" 
        placeholder="enter your full name..."
        defaultValue={props.username}
        required /> 
      : null }
    </form>
  )
  
}

export default Join