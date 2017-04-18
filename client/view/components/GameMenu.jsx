import React from 'react';
import { Link } from 'react-router';
import { socket } from '../../redux/connections';

// components
import Modal from './Modal';
import InvitePlayers from './InvitePlayers';


const GameMenu = (props) => {
  let { member, players, roomName, modalStatus, gameId, deck, playerSet } = props;
  const startGame = () => socket.emit('startNewGame', gameId);

  const isSet = () => {
    // isSetOnBoard(this.props.board);
  };
  return (
    <aside className="gameInfo">
      {/*<h1>Joined {member.name}</h1>
      <p>{players.length} players connected to Room: {roomName.roomName}</p>
      players.map((player, index)=> <p key={index}>PLAYER {index + player.name}</p>) */}
      <li><Link to="/how-to-play">About</Link></li>
      {deck.length && <button onClick={() => startGame()}>Start New Game</button>}
      {
        roomName && modalStatus &&
          <Modal />
      }
      {playerSet && <h4>Last Set By: {playerSet}</h4>}
      <button onClick={isSet}></button>
    </aside>
  );
};

export default GameMenu;
