import { ADD_MEMBER, CHANGE_STATUS, SHOW_BOARD, ROOM_STATUS, PLAYERS} from '../types';

import io from 'socket.io-client';
// export const socket = io(window.location.hostname + ':4000');
export const socket = io.connect();

export default (store) => {
  socket.on('connect', () =>{
    console.log('connect')
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
  });

  socket.on('board', () => {
    //come back to this
    store.dispatch({
      type: SHOW_BOARD
    })
  });

  socket.on('joined', (member) =>{
    console.log(member)
    sessionStorage.member = JSON.stringify(member);
    store.dispatch({
      type: ADD_MEMBER,
      member
    })
  });
  socket.on('connections', (connections)=>{
    console.log(connections)
  })

  socket.on('roomFull', (roomStatus)=>{
    store.dispatch({
      type: ROOM_STATUS,
      roomStatus
    })
  });
}

socket.on('message', function(data) {
   console.log('Incoming message:', data);
});