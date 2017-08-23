import { combineReducers } from 'redux';
import listReducer from '../List/ListReducer';

const rootReducer = combineReducers({ listReducer });

export default rootReducer;
