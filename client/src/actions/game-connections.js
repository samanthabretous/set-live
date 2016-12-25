import { UPDATE_CARDS, PLAYERS, INVITE_PLAYERS, BOARD, LEFT_PLAYER } from './types';
import {socket} from './connections'

export default (store) => {
  socket.on('updateCards', cards =>{
    store.dispatch({
      type: UPDATE_CARDS,
      cards
    })
  })
  socket.on('players', players =>{
    store.dispatch({
      type: PLAYERS,
      players
    })
  });

  socket.on('leftPlayer', (playerHasLeft)=>{
    console.log(player)
    store.dispatch({
      type: LEFT_PLAYER,
      playerHasLeft
    })
  });

  socket.on('invitePlayersToRoom', roomName =>{
    store.dispatch({
      type: INVITE_PLAYERS,
      roomName
    })
  })

  socket.on('board', board => {
    store.dispatch({
      type: BOARD,
      board
    })
  })
}