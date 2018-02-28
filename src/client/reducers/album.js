
import * as ActionTypes from '../containers/AlbumList/actions';
import changeState from '../utils/changeState';
/*
For highlighting and find next playing video, need a unique value to distinguish data from other one.
'key' property is for guarantee of album data integrity.
*/
const initialState = {
  list: [],
  isLoading: false,
  play: {
    isPlaying: false,
    videoId: '',
    albumId: '',
    key: ''
  },
  selected: {
    isLoading: false,
    contents: {}
  }
};

export default (state = initialState, action) => {
  const data = action ? action.payload : '';

  switch (action.type) {
    case ActionTypes.ALBUM_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case ActionTypes.ALBUM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: data.response
      };
    case ActionTypes.ALBUM_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.SONG_REQUEST:
      return {
        ...state,
        selected: {
          ...state.selected,
          isLoading: true
        }
      };
    case ActionTypes.SONG_SUCCESS:
      return {
        ...state,
        selected: {
          ...state.selected,
          isLoading: false,
          album: changeState(
            data.response, 'contents',
            (song, key) => (
              {
                ...song,
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
        selected: {
          ...state.selected,
          album: [],
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
        selected: {
          ...state.selected,
          album: changeState(
            state.selected.album, 'contents',
            (song, key) => (
              {
                ...song,
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
        selected: {
          ...state.selected,
        }
      };
    default:
      return state;
  }
};
