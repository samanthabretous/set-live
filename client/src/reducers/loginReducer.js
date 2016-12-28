import { SET_USER_NAME, SET_EMAIL, SET_PASSWORD, LOGIN_ERROR, FORM_ERRORS, LOGIN_LOADING, REGISTER, RESET_LOGIN} from '../actions/types';

const INTIAL_STATE = {
  username: "",
  email: "",
  password: "",
  loginFormErrors: {},
  loginError: false,
  loading: false,
  isRegistered: true,
}

export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case SET_USER_NAME: 
    case SET_PASSWORD: 
    case SET_EMAIL: 
    case LOGIN_ERROR:
    case FORM_ERRORS:
    case LOGIN_LOADING:
    case REGISTER:
      let key = Object.keys(action)[1]
      return Object.assign({}, state, {[key]: action[key]});
    //action comes from Logout.jsx
    case RESET_LOGIN:
      return Object.assign({}, state, INTIAL_STATE)
    default: 
      return state
  }
}