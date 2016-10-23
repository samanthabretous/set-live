import React from 'react'
import Display from './parts/display'
import Join from './parts/join'
import {Link} from 'react-router'

const WaitingForPlayers = React.createClass({
  render() {
    return (
      <div>
        <Display if={this.props.status==='connected'}>

          <Display if={this.props.member.name}>

          </Display> 
          <Display if={!this.props.member.name}>
            <h1>Join the session</h1>
            <Join emit={this.props.emit}/>
          </Display>
        </Display>

        <Link to="/game">Go to Game</Link>
      </div>
    )
  }
})

export default WaitingForPlayers;