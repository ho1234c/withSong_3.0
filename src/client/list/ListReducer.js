import * as ActionTypes from './ListActions';

const listState = {
  songs: [],
  isLoading: false
};

export default (state = listState, action) => {
  switch(action.type) {
    case ActionTypes.LIST_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        songs: action.payload.response
      };
    case ActionTypes.LIST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
