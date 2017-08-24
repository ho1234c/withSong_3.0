import { combineReducers } from 'redux';
import listReducer from '../List/ListReducer';
import headerReducer from '../Header/HeaderReducer';

const rootReducer = combineReducers({ listReducer, headerReducer });

export default rootReducer;
