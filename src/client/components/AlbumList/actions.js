import createActions from '../../utils/createAction';

export const ALBUM_REQUEST = 'album/ALBUM_REQUEST';
export const ALBUM_SUCCESS = 'album/ALBUM_SUCCESS';
export const ALBUM_FAILURE = 'album/ALBUM_FAILURE';
export const SONG_REQUEST = 'album/SONG_REQUEST';
export const SONG_SUCCESS = 'album/SONG_SUCCESS';
export const SONG_FAILURE = 'album/SONG_FAILURE';
export const LIKE_REQUEST = 'album/LIKE_REQUEST';
export const LIKE_SUCCESS = 'album/LIKE_SUCCESS';
export const LIKE_FAILURE = 'album/LIKE_FAILURE';
export const UNLIKE_REQUEST = 'album/UNLIKE_REQUEST';
export const UNLIKE_SUCCESS = 'album/UNLIKE_SUCCESS';
export const UNLIKE_FAILURE = 'album/UNLIKE_FAILURE';
export const PLAY_START = 'album/PLAY_START';
export const PLAY_STOP = 'album/PLAY_STOP';

export const getAlbum = {
  request: (word, num) => createActions(ALBUM_REQUEST, { word, num }),
  success: response => createActions(ALBUM_SUCCESS, { response }),
  failure: error => createActions(ALBUM_FAILURE, { error })
};

export const getSong = {
  request: id => createActions(SONG_REQUEST, { id }),
  success: (response, isRetain) => createActions(SONG_SUCCESS, { response, isRetain }),
  failure: error => createActions(SONG_FAILURE, { error })
};

export const likeToggle = {
  likeRequest: id => createActions(LIKE_REQUEST, { id }),
  likeSuccess: () => createActions(LIKE_SUCCESS),
  likeFailure: error => createActions(LIKE_FAILURE, { error }),
  unlikeRequest: id => createActions(UNLIKE_REQUEST, { id }),
  unlikeSuccess: () => createActions(UNLIKE_SUCCESS),
  unlikeFailure: error => createActions(UNLIKE_FAILURE, { error })
};

export const play = {
  start: (videoId, key, albumId) => createActions(PLAY_START, { videoId, key, albumId }),
  stop: () => createActions(PLAY_STOP)
};
