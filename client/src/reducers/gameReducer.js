import { PLAYERS, UPDATE_CARDS, BOARD} from '../actions/types';

const INTIAL_STATE = {
  players: [],
  cards: null, 
  board: [], 
  amountOfCardsOnBoard: 12
}

export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case PLAYERS: 
      return Object.assign({}, state, {players: action.players});
    case UPDATE_CARDS: 
      return Object.assign({}, state, {cards: action.cards});
    case BOARD: 
      return Object.assign({}, state, {board: action.board});
  }
  return state
}