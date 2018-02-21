import { delay } from 'redux-saga';
import { take, call, put, takeLatest, fork } from 'redux-saga/effects';
import * as listActions from './actions';
import { getList } from '../List/actions';

export function* toggle(action) {
  if (action.payload.direction === 'down') {
    yield put(listActions.headerMenu.show());
  } else {
    yield put(listActions.headerMenu.hide());
  }
}

export function* search(action) {
  yield delay(1000); // pending for user input
  yield put(listActions.search.start());
  yield put(getList.request(action.payload.word));
  yield put(listActions.search.end());
}

export function* watchScroll() {
  while (true) {
    const action = yield take(listActions.HEADER_SCROLL);
    /* blocking */
    yield call(toggle, action);
  }
}

export function* watchSearch() {
  yield takeLatest(listActions.CHANGE_SEARCH_INPUT, search);
}

export default [
  fork(watchScroll),
  fork(watchSearch)
];
