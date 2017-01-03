import { ADD_MEMBER, CONNECTION_STATUS, SHOW_BOARD, ROOM_STATUS, PLAYERS, SET_PLAYER_INFO} from './types';

import io from 'socket.io-client';
export const socket = io.connect(null,{
  'query': 'token=' + localStorage.token
});

export default (store) => {
  socket.on('connect', () =>{
    store.dispatch({
      type: CONNECTION_STATUS,
      status: 'connected'
    })
  })
  socket.on('authenticated', function () {
    //do other things 
  });


  socket.on('disconnect', () => {
    store.dispatch({
      type: CONNECTION_STATUS,
      status: 'disconnected'
    })
  });

  socket.on('joined', (member) =>{
    sessionStorage.member = JSON.stringify(member);
    store.dispatch({
      type: ADD_MEMBER,
      member
    })
  });

  socket.on('roomFull', (roomStatus)=>{
    store.dispatch({
      type: ROOM_STATUS,
      roomStatus
    })
  });

  socket.on('receivePlayerInfo', payload => {
    console.log(payload)
    const {success, playerInfo} = payload
    if(success){
      store.dispatch({
        type: SET_PLAYER_INFO, 
        playerInfo 
      })
    }
  })
  if(localStorage.token) {
    socket.emit('authenticate', {token: localStorage.token.split(' ')[1]})
  }
  socket.on("unauthorized", function(error) {
    if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
      console.log("User's token has expired");
    }
  });

}

socket.on('message', function(data) {
   console.log('Incoming message:', data);
});