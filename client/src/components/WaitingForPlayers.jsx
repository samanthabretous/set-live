import React from 'react'
import Display from './parts/display'
import Join from './parts/join'
import {Link} from 'react-router'
import {socket} from '../actions/socket-listeners/connections'

const WaitingForPlayers = (props) => {
  return (
    <div>
      <Display if={props.status==='connected'}>
        
        <Display if={props.member.name}>
          <h1>Joined {props.member.name}</h1>
          <p>{props.amountOfConnections} players connected</p>
          {props.waitingPlayers.map((player, index)=> <p key={index}>WAITING{player.name}</p>)}
          <h1>Going to the game room</h1>
          {props.players.map((player, index)=> <p key={index}>PLAYER {index + player.name}</p>)}
        </Display>

        <Display if={!props.member.name}>
          <h1>Join the session</h1>
          <Join />
        </Display>
      </Display>

      <Link to="/game">Go to Game</Link>
    </div>
  )
}

export default WaitingForPlayers;