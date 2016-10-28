import { ADD_MEMBER, CHANGE_STATUS, SHOW_BOARD, PLAYERS } from '../types';

import io from 'socket.io-client';
export const socket = io("http://localhost:3000");

export default function (store){
  socket.on('connect', () =>{
    console.log(socket.id)
    store.dispatch({
      type: CHANGE_STATUS,
      status: 'connected'
    })
  });
  socket.on('disconnect', () => {
    //console.log('disconnected')
    store.dispatch({
      type: CHANGE_STATUS,
      status: 'disconnected'
    })
  })
  socket.on('board', () => {
    //come back to this
    store.dispatch({
      type: SHOW_BOARD
    })
  })
  socket.on('joined', (member) =>{
    console.log("joining")
    store.dispatch({
      type: ADD_MEMBER,
      member
    })
  });
  socket.on('joined', ()=>{
    store.dispatch({
      type: 'connection:joined'
    })
  })
}