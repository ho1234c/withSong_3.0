import { call, put, select, takeEvery, fork } from 'redux-saga/effects';
import { fetchList, fetchSong } from '../utils/fetch';
import * as playerActions from './PlayerActions';
import { player } from '../utils/selector';

/* todo: get list from session */
function* getList(action) {
  try {
    const response = yield call(fetchList, action.payload);

    yield put(playerActions.getList.success(response.data));
  }catch(error) {
    yield put(playerActions.getList.failure(error));
  }
}

function* getSong(action) {
  const playingVideo = yield select(player.getPlayingVideo);
  const isRetain = playingVideo.listId === action.payload.id ? playingVideo : '';

  try {
    const response = yield call(fetchSong, action.payload);

    yield put(playerActions.getSong.success(response.data, isRetain));
  }catch(error) {
    yield put(playerActions.getSong.failure(error));
  }
}

export function* watchGetList() {
  yield takeEvery(playerActions.LIST_REQUEST, getList);
}

export function* watchGetSong() {
  yield takeEvery(playerActions.SONG_REQUEST, getSong);
}

export const playerSaga = [
  fork(watchGetList),
  fork(watchGetSong)
];
