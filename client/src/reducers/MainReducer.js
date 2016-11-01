import cards from '../card_deck'
import { ADD_MEMBER, CHANGE_STATUS, WAITING_PLAYERS, PLAYERS, CONNECTIONS } from '../actions/types';

const INTIAL_STATE = {
  amountOfConnections: [],
  member: {},
  waitingPlayers:[],
  players: [],
  status: 'disconnected'
}

export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case ADD_MEMBER: 
      return Object.assign({}, state, {member: action.member});
    case CHANGE_STATUS: 
      return Object.assign({}, state, {status: action.status});
    case WAITING_PLAYERS: 
      return Object.assign({}, state, {waitingPlayers:action.players});    
    case PLAYERS: 
      return Object.assign({}, state, {players: action.players});
    case CONNECTIONS: 
      return Object.assign({}, state, {amountOfConnections: action.amountOfConnections});
  }
  return state
}