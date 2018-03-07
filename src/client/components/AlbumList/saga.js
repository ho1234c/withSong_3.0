import { call, put, select, take, takeEvery, fork } from 'redux-saga/effects';
import { resource } from '../../utils/fetch';
import { albumList, player } from '../../utils/selector';
import * as albumActions from './actions';
import * as videoActions from '../Video/actions';
import { play as playerPlay } from '../Player/actions';

export function* getAlbum(action) {
  try {
    const response = yield call(resource.getAlbum, action.payload);

    yield put(albumActions.getAlbum.success(response.data));
  } catch (error) {
    yield put(albumActions.getAlbum.failure(error));
  }
}

export function* getSong(action) {
  try {
    const playingVideo = yield select(albumList.getPlayingVideo);
    const isRetain = playingVideo && playingVideo.albumId === action.payload.id ?
      playingVideo : false;
    const response = yield call(resource.getSong, action.payload);

    yield put(albumActions.getSong.success(response.data, isRetain));
  } catch (error) {
    yield put(albumActions.getSong.failure(error));
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
    const isPlaying = yield select(albumList.isPlaying);

    if (isPlaying) {
      const { videoId, key } = yield select(albumList.getNextVideo);

      if (videoId && key) {
        yield put(albumActions.play.start(videoId, key));
        yield put(videoActions.video.change(videoId));
      } else {
        yield put(albumActions.play.stop());
      }
    }
  }
}

export function* watchGetAlbum() {
  yield takeEvery(albumActions.ALBUM_REQUEST, getAlbum);
}

export function* watchGetSong() {
  yield takeEvery(albumActions.SONG_REQUEST, getSong);
}

export function* watchPlaySong() {
  yield takeEvery(albumActions.PLAY_START, playSong);
}

export default [
  fork(watchGetAlbum),
  fork(watchGetSong),
  fork(watchPlaySong),
  fork(nextPlayFlow)
];
