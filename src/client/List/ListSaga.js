import { call, put, select, take, takeEvery, fork } from 'redux-saga/effects';
import { fetchList, fetchSong } from '../utils/fetch';
import * as listActions from './ListActions';
import * as videoActions from '../Video/VideoActions';
import { list } from '../utils/selector';

function* getList(action) {
  try {
    const response = yield call(fetchList, action.payload);

    yield put(listActions.getList.success(response.data));
  }catch(error) {
    yield put(listActions.getList.failure(error));
  }
}

function* getSong(action) {
  const playingVideo = yield select(list.getPlayingVideo);
  const isRetain = playingVideo.listId === action.payload.id ? playingVideo : '';

  try {
    const response = yield call(fetchSong, action.payload);

    yield put(listActions.getSong.success(response.data, isRetain));
  }catch(error) {
    yield put(listActions.getSong.failure(error));
  }
}

function* playSong(action) {
  yield put(videoActions.video.change(action.payload.videoId));
}

function* nextPlayFlow() {
  while(true) {
    yield take(videoActions.VIDEO_END);
    const playing = yield select(list.isPlaying);

    if(playing) {
      const { videoId, key } = yield select(list.getNextVideo);

      if(videoId && key) {
        yield put(listActions.play.start(videoId, key));
        yield put(videoActions.video.change(videoId));
      }else {
        yield put(listActions.play.stop());
      }
    }
  }
}

function* watchGetList() {
  yield takeEvery(listActions.LIST_REQUEST, getList);
}

function* watchGetSong() {
  yield takeEvery(listActions.SONG_REQUEST, getSong);
}

function* watchPlaySong() {
  yield takeEvery(listActions.PLAY_START, playSong);
}

export const listSaga = [
  fork(watchGetList),
  fork(watchGetSong),
  fork(watchPlaySong),
  fork(nextPlayFlow)
];
