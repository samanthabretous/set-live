import { UPDATE_CARDS, PLAYERS } from '../types';
import {socket} from './connections'

export default (store) => {
  socket.on('updateCards', (cards) =>{
    store.dispatch({
      type: UPDATE_CARDS,
      cards
    })
  })
  socket.on('players', (players)=>{
    store.dispatch({
      type: PLAYERS,
      players
    })
  });
}