import { PLAYERS, UPDATE_CARDS, BOARD, INVITE_PLAYERS, MODAL_STATUS} from '../actions/types';

const INTIAL_STATE = {
  players: [],
  cards: null, 
  board: [], 
  amountOfCardsOnBoard: 12, 
  roomName: "",
  modalStatus: true
}

export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case PLAYERS: 
      return Object.assign({}, state, {players: action.players});
    case INVITE_PLAYERS: 
      return Object.assign({}, state, {roomName: action.roomName});
    case UPDATE_CARDS: 
      return Object.assign({}, state, {cards: action.cards});
    case BOARD: 
      return Object.assign({}, state, {board: action.board});
    case MODAL_STATUS: 
      return Object.assign({}, state, {modalStatus: action.payload});
    default: 
      return state
  }
}