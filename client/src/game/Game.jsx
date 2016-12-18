import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import store from '../store'
import {socket} from '../actions/socket-listeners/connections'

import Display from '../app/Display'
import Board from './Board';
import ChatBar from './chatBar';
import InvitePlayers from './InvitePlayers'
import Modal from '../app/Modal'
import {MODAL_STATUS} from '../actions/types'

import isSetOnBoard from './isSetOnBoard'

const Game = React.createClass({
  componentDidMount(){
    setTimeout(() => {
      console.log('timeout')
      store.dispatch({
        type: MODAL_STATUS, 
        modalStatus: false
      }) 
    }, 5000)
  },
  startGame(roomName){
    console.log(roomName)
    socket.emit('startNewGame', roomName)
  },
  isSet(){
    console.log(isSetOnBoard(this.props.board))
  },
  render(){
    return (
      <div className="gameView">
        <section className="gameInfo">
          <Display if={this.props.member.name}>
            <h1>Joined {this.props.member.name}</h1>
            <p>{this.props.players.length} players connected to Room: {this.props.roomName}</p>
            {this.props.players.map((player, index)=> <p key={index}>PLAYER {index + player.name}</p>)}
          </Display>
          <button onClick={()=> this.startGame(this.props.member.room)}>Start New Game</button>
          {
            this.props.roomName && this.props.modalStatus 
            ?
              <Modal className="modal-anim" transitionName={"modal-anim"}>
                <InvitePlayers />
              </Modal>
            : null
          }
          <button onClick={this.isSet}></button>
        </section>
        <Display if={this.props.board.length > 0} >
          <Board board={this.props.board}/>
        </Display>
      </div>
    )
  }
})

export default Game;
