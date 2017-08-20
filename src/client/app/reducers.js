import { combineReducers } from 'redux';
import listReducer from '../list/ListReducer';

const rootReducer = combineReducers({ listReducer });

export default rootReducer;
