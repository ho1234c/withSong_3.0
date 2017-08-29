import { all, fork } from 'redux-saga/effects';
import { watchGetList } from '../List/ListSaga';
import { watchScroll, watchSearch } from '../Header/HeaderSaga';

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchScroll),
    fork(watchSearch)
  ]);
}
