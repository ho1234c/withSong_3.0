import { combineReducers } from 'redux';
import listReducer from '../List/ListReducer';
import headerReducer from '../Header/HeaderReducer';

const rootReducer = combineReducers(
  {
    list: listReducer,
    header: headerReducer
  });

export default rootReducer;
