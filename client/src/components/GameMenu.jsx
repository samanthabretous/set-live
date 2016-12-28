import React from 'react'
import {socket} from '../actions/connections'
import {Link} from 'react-router'

//components
import Modal from './Modal'
import InvitePlayers from './InvitePlayers'


const GameMenu = (props) => {
  let {member, players, roomName, modalStatus, game} = props
  const startGame = roomName => {
    socket.emit('startNewGame', game.id)
  };
  const isSet = () => {
    console.log(isSetOnBoard(this.props.board))
  };
  return (
    <div className="gameInfo">
      {/*<h1>Joined {member.name}</h1>
      <p>{players.length} players connected to Room: {roomName.roomName}</p>
      players.map((player, index)=> <p key={index}>PLAYER {index + player.name}</p>) */}
      <li><Link to="/how-to-play">About</Link></li>
      <button onClick={()=> startGame()}>Start New Game</button>
      {
        roomName && modalStatus &&
          <Modal/>
      }
      <button onClick={isSet}></button>
    </div>
  )
}

export default GameMenu