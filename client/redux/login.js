/** ===========================
  TYPES
==============================*/
export const RESET_LOGIN = 'reset_login';
/** ===========================
  ACTIONS
==============================*/

/** ===========================
  REDUCERS
==============================*/

const INTIAL_STATE = {

};

export default function (state = INTIAL_STATE, action) {
  switch (action.type) {
    case REGISTER:
      let key = Object.keys(action)[1];
      return Object.assign({}, state, { [key]: action[key] });
    // action comes from Logout.jsx
    case RESET_LOGIN:
      return Object.assign({}, state, INTIAL_STATE);
    default:
      return state;
  }
};
