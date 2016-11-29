import React from 'react'
import Display from './parts/display'
import Board from './Game/board';
import ChatBar from './Game/chatBar';

const Game = (props) => {
  return (
    <div>
      <h1>Game</h1>
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
