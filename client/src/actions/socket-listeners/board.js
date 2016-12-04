import { UPDATE_CARDS, PLAYERS, INVITE_PLAYERS } from '../types';
import {socket} from './connections'

export default (store) => {
  socket.on('updateCards', cards =>{
    store.dispatch({
      type: UPDATE_CARDS,
      cards
    })
  })
  socket.on('players', players =>{
    console.log(players)
    store.dispatch({
      type: PLAYERS,
      players
    })
  });

  socket.on('invitePlayersToRoom', roomName =>{
    store.dispatch({
      type: INVITE_PLAYERS,
      roomName
    })
  })
}