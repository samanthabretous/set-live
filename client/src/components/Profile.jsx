import React from 'react'
import Radium from 'radium'
import {Motion, spring} from 'react-motion';
import {Link} from 'react-router'

import store from '../store'
import {socket} from '../actions/connections'

const Profile = Radium( props => {

  let {roomName, username, generateRoomName, game} = props

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
    (!props.params.room && <div className="landingPage">
      <input 
        onChange={handleRoomChange}
        className="landingInput"
        placeholder="enter a room name..."
      />
      <button to="/game" 
        className="btn btn-primary"
        disabled={!roomName}
        onClick={joinRoom}>
        Enter Room
      </button>
      {game && (
        <Link to={`/game/${game.id}`}>
          Go To Game
        </Link>
      )}
    </div>
    )
  )
})

export default Profile;