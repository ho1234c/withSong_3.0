import createActions from '../utils/createAction';

export const LIST_REQUEST = 'list/LIST_REQUEST';
export const LIST_SUCCESS = 'list/LIST_SUCCESS';
export const LIST_FAILURE = 'list/LIST_FAILURE';
export const SONG_REQUEST = 'list/SONG_REQUEST';
export const SONG_SUCCESS = 'list/SONG_SUCCESS';
export const SONG_FAILURE = 'list/SONG_FAILURE';
export const PLAY_START = 'list/PLAY_START';
export const PLAY_STOP = 'list/PLAY_STOP';

export const getList = {
  request: (word, num) => createActions(LIST_REQUEST, { word, num }),
  success: response => createActions(LIST_SUCCESS, { response }),
  failure: error => createActions(LIST_FAILURE, { error })
};

export const getSong = {
  request: id => createActions(SONG_REQUEST, { id }),
  success: (response, isRetain) => createActions(SONG_SUCCESS, { response, isRetain }),
  failure: error => createActions(SONG_FAILURE, { error })
};

export const play = {
  start: (videoId, key, listId) => createActions(PLAY_START, { videoId, key, listId }),
  stop: () => createActions(PLAY_STOP)
};
