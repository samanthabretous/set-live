import { SET_USER_NAME, SET_EMAIL, SET_PASSWORD, LOGIN_MODAL, LOGIN_FORM_ERRORS, LOGIN_LOADING} from '../actions/types';

const INTIAL_STATE = {
  username: "sam",
  email: "sam@gmail.com",
  password: "password123",
  loginModal: false,
  loginErrors: {},
  loading: false
}

export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case SET_USER_NAME: 
    case SET_PASSWORD: 
    case SET_EMAIL: 
    case LOGIN_MODAL:
    case LOGIN_FORM_ERRORS:
    case LOGIN_LOADING:
      let key = Object.keys(action)[1]
      console.log(key)
      return Object.assign({}, state, {[key]: action[key]});
    default: 
      return state
  }
}