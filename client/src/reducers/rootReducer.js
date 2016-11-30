import {combineReducers} from 'redux';

import gameReducer from './gameReducer';
import landingPageReducer from './landingPageReducer'

export const rootReducer = combineReducers({
  landingPageReducer,
  gameReducer
});