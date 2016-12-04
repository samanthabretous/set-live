import React from 'react'
import store from '../store'
import {socket} from '../actions/socket-listeners/connections'

import Display from './parts/display'
import Board from './Game/Board';
import ChatBar from './Game/chatBar';
import InvitePlayers from './Game/InvitePlayers'
import Modal from './parts/Modal'
import {MODAL_STATUS} from '../actions/types'

const Game = React.createClass({
  componentDidMount(){
    setTimeout(() => {
      console.log('timeout')
      store.dispatch({
        type: MODAL_STATUS, 
        modalStatus: false
      }) 
    }, 2000)
  },
  startGame(roomName){
    console.log('start')
    socket.emit('startNewGame', roomName)
  },
  render(){
    return (
      <div>
        <Display if={this.props.member.name}>
          <h1>Joined {this.props.member.name}</h1>
          <p>{this.props.players.length} players connected to Room: {this.props.roomName}</p>
          {this.props.players.map((player, index)=> <p key={index}>PLAYER {index + player.name}</p>)}
        </Display>
        <button onClick={()=> this.startGame(this.props.roomName)}>Start New Game</button>
        <Display if={this.props.roomName && this.props.modalStatus} >
          <Modal transitionName="modal-anim">
            <InvitePlayers />
          </Modal>
        </Display>
        <Display if={this.props.board.length > 0} >
          <Board board={this.props.board}/>
        </Display>
      </div>
    )
  }
})

export default Game;
