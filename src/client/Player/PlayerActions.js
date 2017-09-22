import createActions from '../utils/createAction';

export const LIST_REQUEST = 'player/LIST_REQUEST';
export const LIST_SUCCESS = 'player/LIST_SUCCESS';
export const LIST_FAILURE = 'player/LIST_FAILURE';
export const SONG_REQUEST = 'player/SONG_REQUEST';
export const SONG_SUCCESS = 'player/SONG_SUCCESS';
export const SONG_FAILURE = 'player/SONG_FAILURE';
export const FIND_SONG_REQUEST = 'player/FIND_SONG_REQUEST';
export const FIND_SONG_SUCCESS = 'player/FIND_SONG_SUCCESS';
export const FIND_SONG_FAILURE = 'player/FIND_SONG_FAILURE';
export const PLAYER_OPEN = 'player/PLAYER_OPEN';
export const PLAYER_CLOSE = 'player/PLAYER_CLOSE';
export const PLAY_START = 'player/PLAY_START';
export const PLAY_STOP = 'player/PLAY_STOP';

export const getList = {
  request: userId => createActions(LIST_REQUEST, { userId }),
  success: response => createActions(LIST_SUCCESS, { response }),
  failure: error => createActions(LIST_FAILURE, { error })
};

export const getSong = {
  request: id => createActions(SONG_REQUEST, { id }),
  success: (response, isRetain) => createActions(SONG_SUCCESS, { response, isRetain }),
  failure: error => createActions(SONG_FAILURE, { error })
};

export const findSong = {
  request: word => createActions(FIND_SONG_REQUEST, { word }),
  success: response => createActions(FIND_SONG_SUCCESS, { response }),
  failure: error => createActions(FIND_SONG_FAILURE, { error })
};

export const playerModal = {
  open: () => createActions(PLAYER_OPEN),
  close: () => createActions(PLAYER_CLOSE)
};

export const play = {
  start: (videoId, key, listId) => createActions(PLAY_START, { videoId, key, listId }),
  stop: () => createActions(PLAY_STOP)
};
