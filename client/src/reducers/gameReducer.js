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
    case INVITE_PLAYERS: 
    case UPDATE_CARDS: 
    case BOARD: 
    case MODAL_STATUS: 
      let key = Object.keys(action)[1]
      return Object.assign({}, state, {[key]: action[key]});
    default: 
      return state
  }
}