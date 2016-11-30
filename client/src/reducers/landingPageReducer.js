import {ADD_MEMBER, CHANGE_STATUS, SET_USER_NAME, CONNECTIONS, ROOM_STATUS, SET_ROOM_NAME} from '../actions/types'

const INTIAL_STATE = {
  username: null,
  amountOfConnections: [],
  member: {},
  status: 'disconnected',
  roomStatus: false, 
  roomname: null,
}


export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case ADD_MEMBER: 
      return Object.assign({}, state, {member: action.member});
    case CHANGE_STATUS: 
      return Object.assign({}, state, {status: action.status});
    case ROOM_STATUS: 
      return Object.assign({}, state, {roomStatus: action.roomStatus});
    case SET_USER_NAME: 
      return Object.assign({}, state, {username: action.payload})
    case SET_ROOM_NAME: 
      return Object.assign({}, state, {roomName: action.payload})
    case CONNECTIONS: 
      return Object.assign({}, state, {amountOfConnections: action.amountOfConnections});
    default: 
      return state
  }
}