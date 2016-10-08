import React from 'react'
import Display from './parts/display'
import Join from './parts/join'
import Board from './parts/Game/board';
import ChatBar from './parts/Game/chatBar';

const Game = React.createClass({
  render() {
    return (
      <div>
        <h1>Game</h1>
        <Board 
          board={this.props.board} 
          cards={this.props.cards} 
          amountOfCardsOnBoard={this.props.amountOfCardsOnBoard}
          fillBoard={this.props.fillBoard}
          handleClick={this.props.handleClick}/>
        <ChatBar />
      </div>
    )
  }
})

export default Game;