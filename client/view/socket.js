import io from 'socket.io-client';
import { connectionStatus, addMember, roomStatus, setPlayerInfo } from '../redux/connections';
import { goToGame } from '../redux/game';

// connect socket with token authentication
export const socket = io.connect(null, {
  query: `token=${localStorage.token}`,
});

export default (store) => {
  // check to see if there is a token storage so the user doesnt have to sign in
  if (localStorage.token) {
    socket.emit('authenticate', { token: localStorage.token.split(' ')[1] });
  }

  socket.on('connect', () => {
    store.dispatch(connectionStatus('connected'));
  });

  socket.on('disconnect', () => {
    store.dispatch(connectionStatus('disconnected'));
  });

  socket.on('authenticated', (payload) => {
    // do other things
  });


  socket.on('joined', (member) => {
    sessionStorage.member = JSON.stringify(member);
    store.dispatch(addMember(member));
  });

  socket.on('roomFull', (status) => {
    store.dispatch(roomStatus(status));
  });

  socket.on('receivePlayerInfo', (payload) => {
    const { success, playerInfo } = payload;
    if (success) {
      store.dispatch(setPlayerInfo(playerInfo));
    }
  });

  socket.on('receiveGameInfo', (payload) => {
    const { success, game } = payload;
    if (success) {
      console.log(game.cards.splice(0, 12));
      const gameInfo = {
        game,
        players: game.players,
        playerInfo: game.currentPlayer[0],
        board: game.cards.splice(0, 12),
      };
      store.dispatch(goToGame(gameInfo));
    }
  });

  socket.on('unauthorized', (error) => {
    if (error.data.type === 'UnauthorizedError' || error.data.code === 'invalid_token') {
      console.log("User's token has expired");
    }
  });
}
