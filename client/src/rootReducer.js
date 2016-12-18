import {combineReducers} from 'redux';

import gameReducer from './game/gameReducer';
import landingPageReducer from './landingPage/landingPageReducer'

export const rootReducer = combineReducers({
  landingPageReducer,
  gameReducer
});