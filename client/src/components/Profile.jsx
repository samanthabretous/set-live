import React from 'react'
import {Link} from 'react-router'
import _ from 'lodash'
import store from '../store';
import {socket} from '../actions/connections';


const Profile = props => {

  let {roomName, username, generateRoomName, playerInfo, gameId, players} = props

  let handleRoomChange = (event) => {
    generateRoomName(event.target.value)
  };

  let joinRoom = () =>{
    socket.emit('enterGameRoom', {
      roomName,
      username: playerInfo.username,
    });
  };
  console.log(gameId, players)
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
        {gameId && _.map(players, player => {
          <h1>{player.username}</h1>
        })
          <Link to={`/game/${gameId}`}>
            Go To Game
          </Link>
        )}
      </div>
    </div>)
  )
}

export default Profile;