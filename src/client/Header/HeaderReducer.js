import * as ActionTypes from './HeaderActions';

const headerState = {
  isShow: true,
  word: '',
  isLoading: false,
  listModal: { isLoading: false, isShow: false },
  authModal: { isShow: false }
};

export default (state = headerState, action) => {
  switch(action.type) {
    case ActionTypes.HEADER_HIDE:
      return {
        ...state,
        isShow: false
      };
    case ActionTypes.HEADER_SHOW:
      return {
        ...state,
        isShow: true
      };
    case ActionTypes.CHANGE_SEARCH_INPUT:
      return {
        ...state,
        word: action.payload.word
      };
    case ActionTypes.SEARCH_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        songs: action.payload.response
      };
    case ActionTypes.SEARCH_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
