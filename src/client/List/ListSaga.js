import { call, put, select, take, takeEvery } from 'redux-saga/effects';
import { fetchList, fetchSong } from '../utils/fetch';
import * as listActions from './ListActions';
import * as videoActions from '../Video/VideoActions';
import { isPlaying, getPlayingVideo, getNextVideo } from './ListReducer';

function* getList(action) {
  try {
    const response = yield call(fetchList, action.payload);

    yield put(listActions.getList.success(response.data));
  }catch(error) {
    yield put(listActions.getList.failure(error));
  }
}

function* getSong(action) {
  const playingVideo = yield select(getPlayingVideo);
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

export function* nextPlayFlow() {
  while(true) {
    yield take(videoActions.VIDEO_END);
    const playing = yield select(isPlaying);

    if(playing) {
      const { videoId, key } = yield select(getNextVideo);

      if(videoId && key) {
        yield put(listActions.play.start(videoId, key));
        yield put(videoActions.video.change(videoId));
      }else {
        yield put(listActions.play.stop());
      }
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

