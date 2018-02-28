import { combineReducers } from 'redux';
import albumReducer from './album';
import headerReducer from './header';
import videoReducer from './video';
import playerReducer from './player';
import authReducer from './auth';

const rootReducer = combineReducers({
  album: albumReducer,
  header: headerReducer,
  player: playerReducer,
  video: videoReducer,
  auth: authReducer
});

export default rootReducer;
