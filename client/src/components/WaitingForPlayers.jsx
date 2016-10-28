import React from 'react'
import Display from './parts/display'
import Join from './parts/join'
import {Link} from 'react-router'

const WaitingForPlayers = (props) => {
  console.log(props.status)
  return (
    <div>
      <Display if={props.status==='connected'}>
          <h1>Join the session</h1>
          <Join />
        </Display>
      <Link to="/game">Go to Game</Link>
    </div>
  )
}

export default WaitingForPlayers;