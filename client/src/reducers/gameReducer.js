import { PLAYERS, UPDATE_CARDS, BOARD, INVITE_PLAYERS, MODAL_STATUS, CLICKED_CARDS, LEFT_PLAYERS, ADD_MEMBER, CONNECTION_STATUS, SET_USER_NAME, SET_EMAIL, SET_PASSWORD, CONNECTIONS, ROOM_STATUS, SET_ROOM_NAME, LOGIN_MODAL, LOGIN_FORM_ERRORS} from '../actions/types';

const INTIAL_STATE = {
  // login/register form
  username: "",
  email: "",
  password: "",
  loginModal: false,
  loginErrors: {},

  players: [],
  playerHasLeft: null,
  cards: null, 
  board: [], 
  roomName: "",
  modalStatus: true,
  clickedCards: [],
  member: {},
  status: 'disconnected',
}

export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case SET_USER_NAME: 
    case SET_PASSWORD: 
    case SET_EMAIL: 
    case LOGIN_MODAL:
    case LOGIN_FORM_ERRORS:
 
    case PLAYERS: 
    case INVITE_PLAYERS: 
    case UPDATE_CARDS: 
    case BOARD: 
    case MODAL_STATUS: 
    case ADD_MEMBER: 
    case CONNECTION_STATUS: 
    case SET_ROOM_NAME: 
      let key = Object.keys(action)[1]
      console.log(key)
      return Object.assign({}, state, {[key]: action[key]});
    case CLICKED_CARDS: 
      return Object.assign({}, state, {clickedCards: action.payload})
      return
    default: 
      return state
  }
}