import createActions from '../../utils/createAction';

export const ALBUM_REQUEST = 'player/ALBUM_REQUEST';
export const ALBUM_SUCCESS = 'player/ALBUM_SUCCESS';
export const ALBUM_FAILURE = 'player/ALBUM_FAILURE';
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
export const CREATE_ALBUM_REQUEST = 'player/CREATE_ALBUM_REQUEST';
export const CREATE_ALBUM_SUCCESS = 'player/CREATE_ALBUM_SUCCESS';
export const CREATE_ALBUM_FAILURE = 'player/CREATE_ALBUM_FAILURE';
export const SEARCH_SONG_REQUEST = 'player/SEARCH_SONG_REQUEST';
export const SEARCH_SONG_SUCCESS = 'player/SEARCH_SONG_SUCCESS';
export const SEARCH_SONG_FAILURE = 'player/SEARCH_SONG_FAILURE';

export const getAlbum = {
  request: userId => createActions(ALBUM_REQUEST, { userId }),
  success: response => createActions(ALBUM_SUCCESS, { response }),
  failure: error => createActions(ALBUM_FAILURE, { error })
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
  start: (videoId, key, albumId) => createActions(PLAY_START, { videoId, key, albumId }),
  stop: () => createActions(PLAY_STOP)
};
