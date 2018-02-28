import { call, put, select, take, takeEvery, fork } from 'redux-saga/effects';
import { resource } from '../../utils/fetch';
import { player, list } from '../../utils/selector';
import * as playerActions from './actions';
import * as videoActions from '../Video/actions';
import * as albumListActions from '../AlbumList/actions';

/* todo: get list from session */
function* getAlbum(action) {
  try {
    const response = yield call(resource.getAlbum, action.payload);

    yield put(playerActions.getAlbum.success(response.data));
  } catch (error) {
    yield put(playerActions.getAlbum.failure(error));
  }
}

function* getSong(action) {
  const playingVideo = yield select(player.getPlayingVideo);
  const isRetain = playingVideo.listId === action.payload.id ? playingVideo : '';

  try {
    const response = yield call(resource.getSong, action.payload);

    yield put(playerActions.getSong.success(response.data, isRetain));
  } catch (error) {
    yield put(playerActions.getSong.failure(error));
  }
}

function* playSong(action) {
  const isPlaying = yield select(list.isPlaying);

  if (isPlaying) {
    yield put(albumListActions.play.stop());
  }
  yield put(videoActions.video.change(action.payload.videoId));
}

function* nextPlayFlow() {
  while (true) {
    yield take(videoActions.VIDEO_END);
    const isPlaying = yield select(player.isPlaying);

    if (isPlaying) {
      const { videoId, key } = yield select(player.getNextVideo);

      if (videoId && key) {
        yield put(playerActions.play.start(videoId, key));
        yield put(videoActions.video.change(videoId));
      } else {
        yield put(playerActions.play.stop());
      }
    }
  }
}

export function* watchGetAlbum() {
  yield takeEvery(playerActions.ALBUM_REQUEST, getAlbum);
}

export function* watchGetSong() {
  yield takeEvery(playerActions.SONG_REQUEST, getSong);
}

function* watchPlaySong() {
  yield takeEvery(playerActions.PLAY_START, playSong);
}

export default [
  fork(watchGetAlbum),
  fork(watchGetSong),
  fork(watchPlaySong),
  fork(nextPlayFlow)
];
