import * as ActionTypes from './ListActions';

const listState = {
  lists: [],
  isLoading: false,
  play: {
    isPlaying: false,
    videoId: '',
    key: '' /* For highlighting, I need a unique value to distinguish the data.
               this property is for guarantee of songs data integrity. */
  },
  modal: {
    isLoading: false,
    songs: {}
  }
};

export function isPlaying(state) {
  return state.play.isPlaying;
}

export default (state = listState, action) => {
  const data = action.payload;

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
          isLoading: true
        }
      };
    case ActionTypes.SONG_SUCCESS:
      return {
        ...state,
        modal: {
          isLoading: false,
          songs: {
            ...data.response,
            songInfo: data.response.songInfo.map(
              (song, key) => ({ ...song, key, isNowPlaying: false })
            )
          }
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
    case ActionTypes.PLAY_START:
      return {
        ...state,
        play: {
          isPlaying: true,
          videoId: data.videoId,
          key: data.key
        },
        modal: {
          ...state.modal,
          songs: {
            ...state.modal.songs,
            songInfo: state.modal.songs.songInfo.map(
              (song, key) => (
                { ...song,
                  isNowPlaying: (song.videoId === data.videoId && song.key === data.key)
                }
              )
            )
          }
        }
      };
    case ActionTypes.PLAY_STOP:
      return {
        ...state,
        play: listState.play
      };
    default:
      return state;
  }
};
