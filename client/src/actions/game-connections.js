import { UPDATE_CARDS, ADD_PLAYER, INVITE_PLAYERS, BOARD, LEFT_PLAYER, GO_TO_GAME } from './types';
import {socket} from './connections'

export default (store) => {
  socket.on('updateCards', cards =>{
    store.dispatch({
      type: UPDATE_CARDS,
      cards
    })
  })
  socket.on('addPlayer', player =>{
    console.log(player)
    store.dispatch({
      type: ADD_PLAYER,
      player
    })
  });

  socket.on('leftPlayer', (playerHasLeft)=>{
    console.log(playerHasLeft)
    store.dispatch({
      type: LEFT_PLAYER,
      playerHasLeft
    })
  });

  /*params {Object} gameInfo holds boolean, roomName, players*/
  socket.on('goToGame', gameInfo =>{
    store.dispatch({
      type: GO_TO_GAME,
      gameInfo
    })
  })

  socket.on('board', board => {
    store.dispatch({
      type: BOARD,
      board
    })
  })
}