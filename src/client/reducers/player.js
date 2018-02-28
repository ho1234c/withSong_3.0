import * as ActionTypes from '../containers/Player/actions';
import changeState from '../utils/changeState';

const initialState = {
  isOpen: false,
  isLoading: false,
  albumList: [],
  song: {
    isLoading: false,
    album: {}
  },
  play: {
    isPlaying: false,
    videoId: '',
    albumId: '',
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
        list: data.response
      };
    case ActionTypes.LIST_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case ActionTypes.SONG_REQUEST:
      return {
        ...state,
        list: state.list.map(album => ({ ...album, select: album.id === data.id })),
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
          album: changeState(
            state.song.album, 'contents',
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
          album: changeState(
            state.song.album, 'contents',
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
