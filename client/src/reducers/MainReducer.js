import cards from '../card_deck'
import { ADD_MEMBER } from '../actions/types';

const INTIAL_STATE = {
  cards: cards,
  shuffledCards: cards,
  board: [],
  amountOfCardsOnBoard: 12,
  status: 'disconnected',
  member: {},
  players: [],
}

export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case ADD_MEMBER: 
      return Object.assign({}, state, {member:action.member})
  }
  return state
}