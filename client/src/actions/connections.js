import { ADD_MEMBER, CONNECTION_STATUS, SHOW_BOARD, ROOM_STATUS, PLAYERS} from './types';

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



    //passport
    socket.emit('authenticate', {token: localStorage.token})

    socket.on("unauthorized", function(error) {
      // this should now fire
      console.log(error)
      if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
        alert("User's token has expired");
      }
    });

}

socket.on('message', function(data) {
   console.log('Incoming message:', data);
});