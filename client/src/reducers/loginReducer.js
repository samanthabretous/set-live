import { SET_USER_NAME, SET_EMAIL, SET_PASSWORD, LOGIN_ERROR, FORM_ERRORS, LOGIN_LOADING} from '../actions/types';

const INTIAL_STATE = {
  username: "admin",
  email: "admin@gmail.com",
  password: "admin123",
  formErrors: {},
  loading: false,
  error: false,
}

export default function(state = INTIAL_STATE, action) {
  switch(action.type){
    case SET_USER_NAME: 
    case SET_PASSWORD: 
    case SET_EMAIL: 
    case LOGIN_ERROR:
    case FORM_ERRORS:
    case LOGIN_LOADING:
      let key = Object.keys(action)[1]
      return Object.assign({}, state, {[key]: action[key]});
    default: 
      return state
  }
}