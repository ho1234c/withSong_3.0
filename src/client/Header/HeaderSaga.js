import { delay } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';
import * as actions from './HeaderActions';

function* toggle(action) {
  if(action.payload.direction === 'down') {
    yield put(actions.header.show());
  } else{
    yield put(actions.header.hide());
  }
  yield delay(300);
}

export function* watchHeader() {
  while(true) {
    const action = yield take(actions.HEADER_SCROLL);

    yield call(toggle, action);
  }
}
