import * as ActionTypes from '../components/Auth/actions';

const initialState = {
  isOpen: false,
  isLoading: false,
  isAuth: false,
  user: {}
};

export default (state = initialState, action) => {
  const data = action.payload;

  switch (action.type) {
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
    case ActionTypes.GET_SESSION_REQUEST:
    case ActionTypes.AUTH_SIGN_IN_REQUEST:
    case ActionTypes.AUTH_JOIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.GET_SESSION_SUCCESS:
    case ActionTypes.AUTH_SIGN_IN_SUCCESS:
    case ActionTypes.AUTH_JOIN_SUCCESS:
      return {
        ...initialState,
        isAuth: true,
        user: data.response
      };
    case ActionTypes.AUTH_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.AUTH_LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};
