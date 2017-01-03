import { ADD_PLAYER, UPDATE_CARDS, INVITE_PLAYERS, CLICKED_CARDS, LEFT_PLAYERS, ADD_MEMBER, CONNECTION_STATUS,CONNECTIONS, ROOM_STATUS, SET_ROOM_NAME, GO_TO_GAME, SET_PLAYER_INFO, GAME_STARTED, RELOAD_GAME, UPDATE_GAME } from '../actions/types';

const INTIAL_STATE = {
  players: [],
  playerInfo: null,
  playerHasLeft: null,
  roomName: "",
  gameId: null,
  started: false,
  deck: [],
  board: [],
  clickedCards: [],
  status: 'disconnected',
  playerSet: null,
}

export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case INVITE_PLAYERS: 
    case UPDATE_CARDS:  
    case ADD_MEMBER: 
    case CONNECTION_STATUS: 
    case SET_ROOM_NAME:
    case SET_PLAYER_INFO:
      let key = Object.keys(action)[1]
      return Object.assign({}, state, {[key]: action[key]});
    case CLICKED_CARDS: 
      return Object.assign({}, state, {clickedCards: action.payload})
    case GO_TO_GAME: 
      const {id, room} = action.gameInfo.game;
      return Object.assign({}, state, {gameId: id, roomName: room, players: action.gameInfo.players})
    case ADD_PLAYER: 
      return Object.assign({}, state, {players: [...state.players, action.player]})
    case GAME_STARTED: 
      return Object.assign({}, state, {deck: action.deck, started: true, board: action.board})
    case RELOAD_GAME:
      return Object.assign({}, state, {deck: action.deck, started: action.started, players: action.players, gameId: action.game.id, board:action.board})
    case UPDATE_GAME: 
      return Object.assign({}, state, {board: action.board, deck: action.deck, playerSet: action.playerSet})
    default: 
      return state
  }
}