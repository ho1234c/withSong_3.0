import { call, put, select, take, takeEvery, fork } from 'redux-saga/effects';
import { resource } from '../../utils/fetch';
import { list, player } from '../../utils/selector';
import * as listActions from './actions';
import * as videoActions from '../Video/actions';
import { play as playerPlay } from '../Player/actions';

export function* getList(action) {
  try {
    const response = yield call(resource.getList, action.payload);

    yield put(listActions.getList.success(response.data));
  } catch (error) {
    yield put(listActions.getList.failure(error));
  }
}

export function* getSong(action) {
  try {
    const playingVideo = yield select(list.getPlayingVideo);
    const isRetain = playingVideo && playingVideo.listId === action.payload.id ?
      playingVideo : false;
    const response = yield call(resource.getSong, action.payload);

    yield put(listActions.getSong.success(response.data, isRetain));
  } catch (error) {
    yield put(listActions.getSong.failure(error));
  }
}

export function* playSong(action) {
  const isPlaying = yield select(player.isPlaying);

  if (isPlaying) {
    yield put(playerPlay.stop());
  }
  yield put(videoActions.video.change(action.payload.videoId));
}

export function* nextPlayFlow() {
  while (true) {
    yield take(videoActions.VIDEO_END);
    const isPlaying = yield select(list.isPlaying);

    if (isPlaying) {
      const { videoId, key } = yield select(list.getNextVideo);

      if (videoId && key) {
        yield put(listActions.play.start(videoId, key));
        yield put(videoActions.video.change(videoId));
      } else {
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

export default [
  fork(watchGetList),
  fork(watchGetSong),
  fork(watchPlaySong),
  fork(nextPlayFlow)
];