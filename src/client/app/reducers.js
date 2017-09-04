import { combineReducers } from 'redux';
import listReducer from '../List/ListReducer';
import headerReducer from '../Header/HeaderReducer';
import videoReducer from '../Video/VideoReducer';

const rootReducer = combineReducers(
  {
    list: listReducer,
    header: headerReducer,
    video: videoReducer
  });

export default rootReducer;
