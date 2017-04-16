import { LOGIN_ERROR, FORM_ERRORS, LOGIN_LOADING } from './types';


export const loginErrorAction = loginError => ({
  type: LOGIN_ERROR,
  loginError,
});

export const loginFormErrorsAction = loginFormErrors => ({
  type: FORM_ERRORS,
  loginFormErrors,
});

export const loginLoadingAction = loading => ({
  type: LOGIN_LOADING,
  loading,
});
