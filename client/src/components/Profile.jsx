import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import { socket } from '../actions/connections';


const Profile = (props) => {
  const { roomName, generateRoomName, playerInfo, playerInfo: { username, wins }, gameId, players } = props;

  const handleRoomChange = (event) => {
    generateRoomName(event.target.value);
  };

  const joinRoom = () => {
    socket.emit('enterGameRoom', {
      roomName,
      username,
    });
  };

  return (
    (!props.params.room &&
    <div className="landingPage">
      <h1>Profile Page</h1>
      {playerInfo && (<div>
        <h1>Username: {username}</h1>
        <h1>Total Game Wins: {wins}</h1>
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
        {players.length !== 0 && <h1>{players[0].username}</h1>}
        {players.length !== 0 && _.map(players, (player, index) => (
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
