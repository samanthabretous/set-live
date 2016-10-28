import cards from '../card_deck'
import { ADD_MEMBER, CHANGE_STATUS, PLAYERS } from '../actions/types';

const INTIAL_STATE = {
  member: {},
  players: [],
  status: 'disconnected'
}

export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case ADD_MEMBER: 
      return Object.assign({}, state, {member:action.member});
    case CHANGE_STATUS: 
      return Object.assign({}, state, {status:action.status});
    case PLAYERS: 
    console.log(action.players)
      return Object.assign({}, state, {players:action.players});
  }
  return state
}