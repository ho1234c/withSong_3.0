import { delay } from 'redux-saga';
import { take, call, put, takeLatest, fork } from 'redux-saga/effects';
import * as headerActions from './actions';
import { getAlbum } from '../AlbumList/actions';

export function* toggle(action) {
  if (action.payload.direction === 'down') {
    yield put(headerActions.headerMenu.show());
  } else {
    yield put(headerActions.headerMenu.hide());
  }
}

export function* search(action) {
  yield delay(1000); // pending for user input
  yield put(headerActions.search.start());
  yield put(getAlbum.request(action.payload.word));
  yield put(headerActions.search.end());
}

export function* watchScroll() {
  while (true) {
    const action = yield take(headerActions.HEADER_SCROLL);
    /* blocking */
    yield call(toggle, action);
  }
}

export function* watchSearch() {
  yield takeLatest(headerActions.CHANGE_SEARCH_INPUT, search);
}

export default [
  fork(watchScroll),
  fork(watchSearch)
];
