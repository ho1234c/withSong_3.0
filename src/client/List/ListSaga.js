import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { fetchList, fetchSong } from '../services/fetch';
import * as listActions from './ListActions';
import * as videoActions from '../Video/VideoActions';
import { isPlaying } from './ListReducer';

function* getList(action) {
  try {
    const response = yield call(fetchList, action.payload);
    yield put(listActions.getList.success(response.data));
  }catch(error) {
    yield put(listActions.getList.failure(error));
  }
}

function* getSong(action) {
  try {
    const response = yield call(fetchSong, action.payload);
    yield put(listActions.getSong.success(response.data));
  }catch(error) {
    yield put(listActions.getSong.failure(error));
  }
}

function* playSong(action) {
  yield put(videoActions.video.change(action.payload.videoId));
}

export function* nextPlayFlow() {
  while(true) {
    yield take(videoActions.VIDEO_END);
    const playing = select(isPlaying);

    if(playing) {
      const nextVideoId = 'b1kQvZhQ6_M'; // todo: logic for get next video id and key
      const nextVideoKey = '1';

      yield put(listActions.play.start(nextVideoId, nextVideoKey));
      yield put(videoActions.video.change(nextVideoId));
    }
  }
}

export function* watchGetList() {
  yield takeEvery(listActions.LIST_REQUEST, getList);
}

export function* watchGetSong() {
  yield takeEvery(listActions.SONG_REQUEST, getSong);
}

export function* watchPlaySong() {
  yield takeEvery(listActions.PLAY_START, playSong);
}

