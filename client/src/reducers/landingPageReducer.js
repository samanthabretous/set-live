import {SET_USER_NAME} from '../actions/types'

const INTIAL_STATE = {
  username: null
}


export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case SET_USER_NAME: 
      return Object.assign({}, state, {username: action.payload})
    default: 
      return state
  }
}