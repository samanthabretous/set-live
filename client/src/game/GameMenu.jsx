import React from 'react'
import {socket} from '../actions/socket-listeners/connections'

//components
import Modal from './Modal'
import InvitePlayers from './InvitePlayers'


const GameMenu = (props) => {
  const startGame = (roomName) => {
    socket.emit('startNewGame', roomName)
  };
  const isSet = () => {
    console.log(isSetOnBoard(this.props.board))
  };
  return (
    <div className="gameInfo">
      <h1>Joined {props.member.name}</h1>
      <p>{props.players.length} players connected to Room: {props.roomName.roomName}</p>
      {props.players.map((player, index)=> <p key={index}>PLAYER {index + player.name}</p>)}
      <button onClick={()=> startGame(props.member.room)}>Start New Game</button>
      {
        props.roomName && props.modalStatus &&
          <Modal/>
      }
      <button onClick={isSet}></button>
    </div>
  )
}

export default GameMenu