import * as ActionTypes from './HeaderActions';

const initialState = {
  isShow: true,
  word: '',
  isLoading: false
};

export default (state = initialState, action) => {
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
    case ActionTypes.SEARCH_START:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.SEARCH_END:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
