import * as ActionTypes from './ListActions';

const listState = {
  lists: [],
  isLoading: false,
  modal: {
    isLoading: false,
    songs: []
  }
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
        lists: action.payload.response
      };
    case ActionTypes.LIST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.SONG_REQUEST:
      return {
        ...state,
        modal: {
          ...state.modal,
          isLoading: true
        }
      };
    case ActionTypes.SONG_SUCCESS:
      return {
        ...state,
        modal: {
          isLoading: false,
          songs: action.payload.response
        }
      };
    case ActionTypes.SONG_FAILURE:
      return {
        ...state,
        modal: {
          songs: [],
          isLoading: false
        }
      };
    default:
      return state;
  }
};
