import React from 'react'
import Radium from 'radium'
import {Motion, spring} from 'react-motion';
import {Link} from 'react-router'

import store from '../store'
import {socket} from '../actions/connections'

const Profile = Radium( props => {

  let {roomName, username, generateRoomName} = props

  let handleRoomChange = (event) => {
    generateRoomName(event.target.value)
  };

  let joinRoom = () =>{
    socket.emit('enterGameRoom', {
      roomName,
      username
    });
  };

  return (
    <div className="landingPage">
      <input 
        onChange={handleRoomChange}
        className="landingInput"
        placeholder="enter a room name..."
      />
      {/*<Link to={"/game/" + roomName}>*/}
        <button to="/game" 
          className="btn btn-primary"
          disabled={!roomName}
          onClick={joinRoom}>
          Enter Room
        </button>
      {/*</Link>*/}
    </div>
  )
})

export default Profile;