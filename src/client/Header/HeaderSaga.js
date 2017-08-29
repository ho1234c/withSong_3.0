import { delay } from 'redux-saga';
import { take, call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './HeaderActions';
import { getList } from '../List/ListActions';
// import { fetchList } from '../services/fetch';

function* toggle(action) {
  if(action.payload.direction === 'down') {
    yield put(actions.header.show());
  } else{
    yield put(actions.header.hide());
  }
  yield delay(300);
}

function* search(action) {
  yield delay(1000); // pending for user input
  console.log(action.payload);
  yield put(getList.request(action.payload.word));
  // try{
  //   yield put(actions.search.request());
  //   const response = yield call(fetchList, action.payload);
  //   yield put(actions.search.success(response.data));
  // } catch(error) {
  //   yield put(actions.search.failure(error));
  // }
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
