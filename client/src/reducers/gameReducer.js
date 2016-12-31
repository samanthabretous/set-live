import { ADD_PLAYER, UPDATE_CARDS, BOARD, INVITE_PLAYERS, MODAL_STATUS, CLICKED_CARDS, LEFT_PLAYERS, ADD_MEMBER, CONNECTION_STATUS,CONNECTIONS, ROOM_STATUS, SET_ROOM_NAME, GO_TO_GAME, SET_PLAYER_INFO, GAME_STARTED } from '../actions/types';

const INTIAL_STATE = {
  players: [],
  playerInfo: null,
  playerHasLeft: null,
  roomName: "",
  gameId: null,
  started: false,
  deck: null,
  modalStatus: true,
  clickedCards: [],
  status: 'disconnected',
}

export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case INVITE_PLAYERS: 
    case UPDATE_CARDS: 
    case BOARD: 
    case MODAL_STATUS: 
    case ADD_MEMBER: 
    case CONNECTION_STATUS: 
    case SET_ROOM_NAME:
    case SET_PLAYER_INFO:
      let key = Object.keys(action)[1]
      return Object.assign({}, state, {[key]: action[key]});
    case CLICKED_CARDS: 
      return Object.assign({}, state, {clickedCards: action.payload})
    case GO_TO_GAME: 
      const {id, room, started} = action.gameInfo.game;
      return Object.assign({}, state, {gameId: id, roomName: room, players: action.gameInfo.players, started})
    case ADD_PLAYER: 
      return Object.assign({}, state, {players: [...state.players, action.player]})
    case GAME_STARTED: 
      return Object.assign({}, state, {deck: action.deck, started: true})
    default: 
      return state
  }
}