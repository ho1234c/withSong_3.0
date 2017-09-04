import createActions from '../utils/createAction';

export const LIST_REQUEST = 'LIST_REQUEST';
export const LIST_SUCCESS = 'LIST_SUCCESS';
export const LIST_FAILURE = 'LIST_FAILURE';
export const SONG_REQUEST = 'SONG_REQUEST';
export const SONG_SUCCESS = 'SONG_SUCCESS';
export const SONG_FAILURE = 'SONG_FAILURE';
export const PLAY_START = 'PLAY_START';
export const PLAY_STOP = 'PLAY_STOP';

export const getList = {
  request: (word, num) => createActions(LIST_REQUEST, { word, num }),
  success: response => createActions(LIST_SUCCESS, { response }),
  failure: error => createActions(LIST_FAILURE, { error })
};

export const getSong = {
  request: id => createActions(SONG_REQUEST, { id }),
  success: response => createActions(SONG_SUCCESS, { response }),
  failure: error => createActions(SONG_FAILURE, { error })
};

export const play = {
  start: (videoId, key) => createActions(PLAY_START, { videoId, key }),
  stop: () => createActions(PLAY_STOP)
};
