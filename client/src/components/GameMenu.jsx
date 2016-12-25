import React from 'react'
import {socket} from '../app-client'

//components
import Modal from './Modal'
import InvitePlayers from './InvitePlayers'


const GameMenu = (props) => {
  let {member, players, roomName, modalStatus} = props
  const startGame = (roomName) => {
    socket.emit('startNewGame', props.params.room)
  };
  const isSet = () => {
    console.log(isSetOnBoard(this.props.board))
  };
  return (
    <div className="gameInfo">
      {/*<h1>Joined {member.name}</h1>
      <p>{players.length} players connected to Room: {roomName.roomName}</p>
      players.map((player, index)=> <p key={index}>PLAYER {index + player.name}</p>) */}
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