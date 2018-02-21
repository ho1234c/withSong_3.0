import { combineReducers } from 'redux';
import listReducer from './list';
import headerReducer from './header';
import videoReducer from './video';
import playerReducer from './player';
import authReducer from './auth';

const rootReducer = combineReducers({
  list: listReducer,
  header: headerReducer,
  player: playerReducer,
  video: videoReducer,
  auth: authReducer
});

export default rootReducer;
