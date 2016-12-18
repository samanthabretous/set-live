import { PLAYERS, UPDATE_CARDS, BOARD, INVITE_PLAYERS, MODAL_STATUS, CLICKED_CARDS} from '../actions/types';

const INTIAL_STATE = {
  players: [],
  cards: null, 
  board: [], 
  amountOfCardsOnBoard: 12, 
  roomName: "",
  modalStatus: true,
  clickedCards: []
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
    case CLICKED_CARDS: 
      return Object.assign({}, state, {clickedCards: [... state.clickedCards, action.payload]})
    default: 
      return state
  }
}