import React from 'react'
import Display from './parts/display'
import Join from './parts/join'
import Board from './parts/board';
import ChatBar from './parts/chatBar';

const Game = React.createClass({
  render() {
    return (
      <div>
        <h1>Game</h1>
        <ChatBar />
      </div>
    )
  }
})

export default Game;