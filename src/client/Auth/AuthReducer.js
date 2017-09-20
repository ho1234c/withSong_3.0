import * as ActionTypes from './AuthActions';
// import changeState from '../utils/changeState';

const initialState = {
  isOpen: false,
  isLoading: false,
  user: {}
};

export default (state = initialState, action) => {
  const data = action.payload;

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
    case ActionTypes.AUTH_SIGN_IN_REQUEST:
    case ActionTypes.AUTH_JOIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.AUTH_SIGN_IN_SUCCESS:
    case ActionTypes.AUTH_JOIN_SUCCESS:
      return {
        ...initialState,
        user: data.response
      };
    case ActionTypes.AUTH_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
