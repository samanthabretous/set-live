const gameEvents = {
  client : {
    enterLobby: 'enter lobby',
    playSingle: 'play single',
    quitGame: 'quit game',
  },
  server : {
    enterLobbyStatus: 'enter lobby status',
    lobbyUpdate: 'lobby update',
    gameStarted: 'game started',
    playerSwitched: 'player switched',
    activatePlayer: 'activate player',
    playerLeft: 'player left',
    infoMessage: 'info message',
    shotUpdate: 'shot update',
    gameOver: 'game over',
    quitGameStatus: 'quit game status',
  }
};

module.exports = gameEvents;

