import React from 'react'
import Display from './parts/display'
import Board from './Game/board';
import ChatBar from './Game/chatBar';

const Game = (props) => {
  return (
    <div>
      <h1>Game</h1>
      <Display if={props.member.name}>
        <h1>Joined {props.member.name}</h1>
        <p>{props.amountOfConnections} players connected</p>
        {props.players.map((player, index)=> <p key={index}>PLAYER {index + player.name}</p>)}
      </Display>
      <Board 
        board={props.board}
        cards={props.cards}
        amountOfCardsOnBoard={props.amountOfCardsOnBoard}
      />
      <ChatBar />
    </div>
  )
}

export default Game;
