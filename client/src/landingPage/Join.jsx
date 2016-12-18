import React from 'react'
import store from '../store'
import {generateUserName} from '../actions/thunk-actions'

const Join = (props) => {
  let handleChange = (event) => {
    store.dispatch(generateUserName(event.target.value))
  };
  return (
    <form action="javascript:void(0)">
      <input 
        onChange={handleChange}
        className="userName landingInput" 
        placeholder="enter your full name..."
        defaultValue={props.username ? props.username : ""}
        required /> 
    </form>
  )
  
}

export default Join