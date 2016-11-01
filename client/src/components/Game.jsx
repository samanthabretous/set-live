import React from 'react'
import Display from './parts/display'
import Join from './parts/join'
import Board from './parts/Game/board';
import ChatBar from './parts/Game/chatBar';

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
