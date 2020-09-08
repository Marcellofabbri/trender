import mainReducer from './mainReducer.js';
import authReducer from './authReducer.js';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer
});

export default rootReducer;