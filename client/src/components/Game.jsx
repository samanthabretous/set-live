import React from 'react'
import Display from './parts/display'
// import Board from './Game/board';
import ChatBar from './Game/chatBar';
import InvitePlayers from './Game/InvitePlayers'
import Modal from './parts/Modal'
import {MODAL_STATUS} from '../actions/types'
import store from '../store'

const Game = React.createClass({
  componentDidMount(){
    setTimeout(() => {
      console.log('timeout')
      store.dispatch({
        type: MODAL_STATUS, 
        payload: false
      }) 
    }, 2000)
  },

  render(){
    console.log(this.props.modalStatus)
    console.log(this.props.roomName)
    return (
      <div>
        <Display if={this.props.member.name}>
          <h1>Joined {this.props.member.name}</h1>
          <p>{this.props.players.length} players connected to Room: {this.props.roomName}</p>
          {this.props.players.map((player, index)=> <p key={index}>PLAYER {index + player.name}</p>)}
        </Display>
        <Display if={this.props.roomName && this.props.modalStatus} >
          <Modal transitionName="modal-anim">
            <InvitePlayers />
          </Modal>
        </Display>
      </div>
    )
  }
})

export default Game;


       // <Board 
        //   board={this.props.board}
        //   cards={this.props.cards}
        //   amountOfCardsOnBoard={this.props.amountOfCardsOnBoard}
        // />
        // <ChatBar />
