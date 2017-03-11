import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { socket } from '../actions/connections';


const Profile = (props) => {
  console.log(props.players.length ? props.players : props.players)
  const { roomName, generateRoomName, playerInfo, gameId, players } = props;
  const handleRoomChange = (event) => {
    generateRoomName(event.target.value);
  };

  const joinRoom = () => {
    socket.emit('enterGameRoom', {
      roomName,
      username: playerInfo.username,
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
          onClick={joinRoom}
        >
          Enter Room
        </button>
        {players[0] && <h1>{players[0].username}</h1>}
        {players.length && _.map(players, (player, index) => (
          <h1 key={index}>{player.username}</h1>
        ))}
        {gameId && (
          <Link to={`/game/${gameId}`}>
            Go To Game
          </Link>
        )}
        <Link to="/logout">Logout</Link>
      </div>
    </div>)
  );
};

export default Profile;
