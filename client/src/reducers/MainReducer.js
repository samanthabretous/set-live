import { ADD_MEMBER, CHANGE_STATUS, WAITING_PLAYERS, PLAYERS, CONNECTIONS, UPDATE_CARDS, BOARD } from '../actions/types';

const INTIAL_STATE = {
  amountOfConnections: [],
  member: {},
  waitingPlayers:[],
  players: [],
  status: 'disconnected', 
  cards: null, 
  board: [], 
  amountOfCardsOnBoard: 12
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
    case UPDATE_CARDS: 
      return Object.assign({}, state, {cards: action.cards});
    case BOARD: 
      return Object.assign({}, state, {board: action.board});
  }
  return state
}