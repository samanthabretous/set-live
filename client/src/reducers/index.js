import {combineReducers} from 'redux';

import game from './gameReducer';
import login from './loginReducer';

export default combineReducers({
  game,
  login
});