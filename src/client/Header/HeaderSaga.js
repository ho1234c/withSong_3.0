import { delay } from 'redux-saga';
import { take, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './HeaderActions';
import { getList } from '../List/ListActions';

function* toggle(action) {
  if(action.payload.direction === 'down') {
    yield put(actions.header.show());
  }else {
    yield put(actions.header.hide());
  }
}

function* search(action) {
  yield delay(1000); // pending for user input
  yield put(actions.search.start());
  yield put(getList.request(action.payload.word));
  yield put(actions.search.end());
}

export function* watchScroll() {
  while(true) {
    const action = yield take(actions.HEADER_SCROLL);
    /* blocking */
    yield call(toggle, action);
  }
}

export function* watchSearch() {
  yield takeLatest(actions.CHANGE_SEARCH_INPUT, search);
}
