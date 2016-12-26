import { LOGIN_MODAL, SET_USER_NAME, SET_EMAIL, SET_PASSWORD, LOGIN_FORM_ERRORS, LOGIN_LOADING } from './types';
import {socket} from '../actions/connections'

export const formUsernameAction = username => ({
  type: SET_USER_NAME,
  username
})

export const formEmailAction = email => ({
  type: SET_EMAIL,
  email
})

export const formPasswordAction = password => ({
  type: SET_PASSWORD,
  password
})

export const loginModalAction = loginModal => ({
  type: LOGIN_MODAL,
  loginModal
})

export const loginErrorsAction = loginErrors => ({
  type: LOGIN_FORM_ERRORS,
  loginErrors
})

export const loginLoadingAction = loading => ({
  type: LOGIN_LOADING,
  loading
})

//thunk action
export const signinSocketAction = data => {
  return dispatch => {
    socket.emit('login', data)
  }
}