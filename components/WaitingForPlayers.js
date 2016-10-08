import React from 'react'
import Display from './parts/display'
import Join from './parts/join'
import {Link} from 'react-router'

const WaitingForPlayers = React.createClass({
  render() {
    return (
      <div>
        <h1>Waiting For Players</h1>
        <input />
        <Link to="/game">Go to Game</Link>
      </div>
    )
  }
})

export default WaitingForPlayers;