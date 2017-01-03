import { LOGIN_ERROR, SET_USER_NAME, SET_EMAIL, SET_PASSWORD, FORM_ERRORS, LOGIN_LOADING, REGISTER } from './types';

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

export const loginErrorAction = loginError => ({
  type: LOGIN_ERROR,
  loginError
})

export const loginFormErrorsAction = loginFormErrors => ({
  type: FORM_ERRORS,
  loginFormErrors
})

export const loginLoadingAction = loading => ({
  type: LOGIN_LOADING,
  loading
})


