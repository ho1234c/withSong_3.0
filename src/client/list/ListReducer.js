import * as ActionTypes from './ListActions';
import changeState from '../utils/changeState';
/* 
For highlighting and find next playing video, I need a unique value to distinguish the data.
'key' property is for guarantee of songs data integrity. 
*/
const initialState = {
  lists: [],
  isLoading: false,
  play: {
    isPlaying: false,
    videoId: '',
    listId: '',
    key: ''
  },
  modal: {
    isOpen: false,
    isLoading: false,
    songs: {}
  }
};

export default (state = initialState, action) => {
  const data = action ? action.payload : '';

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
        lists: data.response
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
          isOpen: true,
          isLoading: true
        }
      };
    case ActionTypes.SONG_SUCCESS:
      return {
        ...state,
        modal: {
          ...state.modal,
          isLoading: false,
          songs: changeState(data.response, 'songInfo',
            (song, key) => (
              { ...song,
                key,
                isNowPlaying: data.isRetain ? (data.isRetain.key === key) : false
              }
            )
          )
        }
      };
    case ActionTypes.SONG_FAILURE:
      return {
        ...state,
        modal: {
          ...state.modal,
          songs: [],
          isLoading: false
        }
      };
    case ActionTypes.PLAY_START:
      return {
        ...state,
        play: {
          isPlaying: true,
          videoId: data.videoId,
          listId: data.listId || state.play.listId, // if play in same list, don't change it.
          key: data.key
        },
        modal: {
          ...state.modal,
          songs: changeState(state.modal.songs, 'songInfo',
            (song, key) => (
              { ...song,
                key,
                isNowPlaying: (song.videoId === data.videoId && song.key === data.key)
              }
            )
          )
        }
      };
    case ActionTypes.PLAY_STOP:
      return {
        ...state,
        play: initialState.play
      };
    case ActionTypes.LIST_CLOSE:
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: false
        }
      };
    default:
      return state;
  }
};
