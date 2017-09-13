import * as ActionTypes from './AuthActions';
// import changeState from '../utils/changeState';

const initialState = {
  isOpen: false
};

export default (state = initialState, action) => {
  // const data = action.payload;
  switch(action.type) {
    case ActionTypes.AUTH_OPEN:
      return {
        ...state,
        isOpen: true
      };
    case ActionTypes.AUTH_CLOSE:
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
};
