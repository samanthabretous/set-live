/** ===========================
  TYPES
==============================*/
export const RESET_LOGIN = 'reset_login';
export const USERNAME = 'username';
/** ===========================
  ACTIONS
==============================*/
export const setUsername = username => ({
  type: USERNAME,
  username,
});
