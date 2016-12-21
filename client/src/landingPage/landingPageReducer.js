import {ADD_MEMBER, CHANGE_STATUS, SET_USER_NAME, CONNECTIONS, ROOM_STATUS, SET_ROOM_NAME} from '../actions/types'

const INTIAL_STATE = {
  username: null,
  amountOfConnections: [],
  member: {},
  status: 'disconnected',
  roomStatus: false, 
  roomName: null,
}


export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case ADD_MEMBER: 
    case CHANGE_STATUS: 
    case ROOM_STATUS: 
    case SET_USER_NAME: 
    case SET_ROOM_NAME: 
      let key = Object.keys(action)[1]
      return Object.assign({}, state, {[key]: action[key]});
    default: 
      return state
  }
}