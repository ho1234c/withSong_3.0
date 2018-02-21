import { all } from 'redux-saga/effects';
import listSaga from '../List/saga';
import headerSaga from '../Header/saga';
import playerSaga from '../Player/saga';
import authSaga from '../Auth/saga';

export default function* rootSaga() {
  yield all([
    ...listSaga,
    ...headerSaga,
    ...playerSaga,
    ...authSaga
  ]);
}
