import { ADD_MEMBER, CHANGE_STATUS, SHOW_BOARD, PLAYERS } from '../types';

import io from 'socket.io-client';
export const socket = io("http://localhost:3000");

export default function (store){
  socket.on('connect', () =>{
    store.dispatch({
      type: CHANGE_STATUS,
      status: 'connected'
    })
  });
  socket.on('disconnect', () => {
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
    store.dispatch({
      type: ADD_MEMBER,
      member
    })
  });
  socket.on('players', (players)=>{
    console.log(players, "players")
    store.dispatch({
      type: PLAYERS,
      players
    })
  })
}