export const SONG_REQUEST = 'SONG_REQUEST';
export const SONG_SUCCESS = 'SONG_SUCCESS';
export const SONG_FAILURE = 'SONG_FAILURE';
export const FIND_SONG_REQUEST = 'FIND_SONG_REQUEST';
export const FIND_SONG_SUCCESS = 'FIND_SONG_SUCCESS';
export const FIND_SONG_FAILURE = 'FIND_SONG_FAILURE';

export const getSong = {
  request: id => createActions(SONG_REQUEST, { id }),
  success: (response, isRetain) => createActions(SONG_SUCCESS, { response, isRetain }),
  failure: error => createActions(SONG_FAILURE, { error })
};

export const findSong = {
  request: word => createActions(FIND_SONG_REQUEST, { word }),
  success: response => createActions(FIND_SONG_SUCCESS, { response }),
  failure: error => createActions(FIND_SONG_FAILURE, { error })
}