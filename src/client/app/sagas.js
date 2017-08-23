import { all, fork } from 'redux-saga/effects';
import { watchGetList } from '../List/ListSaga';

export default function* rootSaga() {
  yield all([
    fork(watchGetList)
  ]);
}
