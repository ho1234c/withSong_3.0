import * as ActionTypes from '../containers/Player/actions';
import changeState from '../utils/changeState';

const initialState = {
  isOpen: false,
  isLoading: false,
  lists: [],
  song: {
    isLoading: false,
    songs: {}
  },
  play: {
    isPlaying: false,
    videoId: '',
    listId: '',
    key: ''
  },
  create: {
    isSuccess: false,
    searchSong: {}
  }
};

export default (state = initialState, action) => {
  const data = action.payload;

  switch (action.type) {
    case ActionTypes.PLAYER_OPEN:
      return {
        ...state,
        isOpen: true
      };
    case ActionTypes.PLAYER_CLOSE:
      return {
        ...state,
        isOpen: false
      };
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
        lists: state.lists.map(list => ({ ...list, select: list.id === data.id })),
        song: {
          ...state.song,
          isLoading: true
        }
      };
    case ActionTypes.SONG_SUCCESS:
      return {
        ...state,
        song: {
          isLoading: false,
          songs: changeState(
            data.response, 'songInfo',
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
    case ActionTypes.PLAY_START:
      return {
        ...state,
        play: {
          isPlaying: true,
          videoId: data.videoId,
          listId: data.listId || state.play.listId,
          key: data.key
        },
        song: {
          ...state.song,
          songs: changeState(
            state.song.songs, 'songInfo',
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
        song: {
          ...state.song,
          songs: changeState(
            state.song.songs, 'songInfo',
            (song, key) => ({ ...song, key, isNowPlaying: false })
          )
        },
        play: initialState.play
      };
    case ActionTypes.CREATE_LIST_REQUEST:
    case ActionTypes.CREATE_LIST_SUCCESS:
    case ActionTypes.CREATE_LIST_FAILURE:
    case ActionTypes.SEARCH_SONG_REQUEST:
    case ActionTypes.SEARCH_SONG_SUCCESS:
    case ActionTypes.SEARCH_SONG_FAILURE:
    default:
      return state;
  }
};
