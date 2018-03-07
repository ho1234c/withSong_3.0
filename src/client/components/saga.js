import { all } from 'redux-saga/effects';
import AlbumListSaga from './AlbumList/saga';
import headerSaga from './Header/saga';
import playerSaga from './Player/saga';
import authSaga from './Auth/saga';

export default function* rootSaga() {
  yield all([
    ...AlbumListSaga,
    ...headerSaga,
    ...playerSaga,
    ...authSaga
  ]);
}
