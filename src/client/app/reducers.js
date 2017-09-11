import { combineReducers } from 'redux';
import listReducer from '../List/ListReducer';
import headerReducer from '../Header/HeaderReducer';
import videoReducer from '../Video/VideoReducer';
import playerReducer from '../Player/PlayerReducer';

const rootReducer = combineReducers(
  {
    list: listReducer,
    header: headerReducer,
    player: playerReducer,
    video: videoReducer
  }
);

export default rootReducer;
