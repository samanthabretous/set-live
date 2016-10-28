import React from 'react'
import Display from './parts/display'
import Join from './parts/join'
import {Link} from 'react-router'

const WaitingForPlayers = (props) => {
  console.log(props.status)
  return (
    <div>
      <Display if={props.status==='connected'}>
        <Display if={props.member.name}>
          <h1>Joined {props.member.name}</h1>
          <p>{props.players.length} audience members connected</p>
          {props.players.map((player, index)=> <p key={index}>{player.name}</p>)}
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