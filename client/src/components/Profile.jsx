import React from 'react'
import Radium from 'radium'
import {Motion, spring} from 'react-motion';
import {Link} from 'react-router'

import store from '../store'
import {socket} from '../actions/connections'

const Profile = Radium( props => {

  let {roomName, username, generateRoomName, playerInfo, gameId} = props

  let handleRoomChange = (event) => {
    generateRoomName(event.target.value)
  };

  let joinRoom = () =>{
    socket.emit('enterGameRoom', {
      roomName,
      username: playerInfo.username || username,
    });
  };

  return (
    (!props.params.room && 
    <div className="landingPage">
    <h1>Profile Page</h1>
      {playerInfo && (<div>
        <h1>Username: {playerInfo.username}</h1>
        <h1>Total Game Wins: {playerInfo.wins}</h1>
      </div>)}
      <div>
        <input 
          onChange={handleRoomChange}
          className="landingInput"
          placeholder="enter a room name..."
        />
        <button 
          className="btn btn-primary"
          disabled={!roomName}
          onClick={joinRoom}>
          Enter Room
        </button>
        {gameId && (
          <Link to={`/game/${gameId}`}>
            Go To Game
          </Link>
        )}
      </div>
    </div>)
  )
})

export default Profile;