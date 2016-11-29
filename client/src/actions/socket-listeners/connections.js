import { ADD_MEMBER, CHANGE_STATUS, SHOW_BOARD, WAITING_PLAYERS, PLAYERS, CONNECTIONS } from '../types';

import io from 'socket.io-client';
export const socket = io("http://localhost:4000");


export default (store) => {
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
    sessionStorage.member = JSON.stringify(member);
    store.dispatch({
      type: ADD_MEMBER,
      member
    })
  });
  socket.on('waitingPlayers', (players)=>{
    store.dispatch({
      type: WAITING_PLAYERS,
      players
    })
  })
  socket.on('players', (players)=>{
    store.dispatch({
      type: PLAYERS,
      players
    })
  })
  socket.on('connections', (amountOfConnections)=>{
    store.dispatch({
      type: CONNECTIONS,
      amountOfConnections
    })
  })
}

socket.on('message', function(data) {
   console.log('Incoming message:', data);
});