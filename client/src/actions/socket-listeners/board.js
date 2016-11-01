import { UPDATE_CARDS } from '../types';
import {socket} from './connections'

export default (store) => {
  socket.on('updateCards', (cards) =>{
    store.dispatch({
      type: UPDATE_CARDS,
      cards
    })
  })
}