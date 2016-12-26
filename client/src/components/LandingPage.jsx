import React from 'react'
import Radium from 'radium'
import {Motion, spring} from 'react-motion';
import {Link} from 'react-router'

import store from '../store'
import {socket} from '../actions/connections'

const LandingPage = Radium( props => {

  let {roomName, username, generateRoomName} = props

  let handleNameChange = (event) => {
    props.formUsernameAction(event.target.value)
  };
  let handleRoomChange = (event) => {
    console.log('room')
    console.log(roomName)
    generateRoomName(event.target.value)
  };

  let joinRoom = () =>{
    console.log(roomName)
    socket.emit('enterGameRoom', {
      roomName,
      username
    });
  };

  return (
    <div className="landingPage">
      <input 
        onChange={handleNameChange}
        className="landingInput"
        placeholder="enter your full name..."
        defaultValue={username ? username : ""}
        required />
      <input 
        onChange={handleRoomChange}
        className="landingInput"
        placeholder="enter a room name..."
        required />
      <Link to={"/game/" + roomName}>
        <button to="/game" 
          className="btn btn-primary"
          disabled={!roomName}
          onClick={joinRoom}>
          Enter Room
        </button>
      </Link>
    </div>
  )
})

export default LandingPage;