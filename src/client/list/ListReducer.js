import * as ActionTypes from './ListActions';
import changeState from '../utils/changeState';

/* 
For highlighting and find next playing video, I need a unique value to distinguish the data.
'key' property is for guarantee of songs data integrity. 
*/
const listState = {
  lists: [],
  isLoading: false,
  play: {
    isPlaying: false,
    videoId: '',
    listId: '',
    key: ''
  },
  modal: {
    isLoading: false,
    songs: {}
  }
};

export function isPlaying(state) {
  return state.list.play.isPlaying;
}

export function getPlayingVideo(state) {
  return state.list.play;
}

export function getNextVideo(state) {
  const { play, modal } = state.list;
  const preKey = play.key;
  const songInfo = modal.songs.songInfo;

  if(preKey === songInfo.length - 1) {
    return false;
  }

  return songInfo.find(song => song.key === preKey + 1);
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
          listId: data.listId || state.play.listId,
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
        play: listState.play
      };
    default:
      return state;
  }
};
