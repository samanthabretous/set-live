import {combineReducers} from 'redux';

import mainReducer from './mainReducer';
import landingPageReducer from './landingPageReducer'

export const rootReducer = combineReducers({
  landingPageReducer,
  mainReducer
});