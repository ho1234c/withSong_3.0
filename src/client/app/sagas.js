import { all } from 'redux-saga/effects';
import { listSaga } from '../List/ListSaga';
import { headerSaga } from '../Header/HeaderSaga';
import { playerSaga } from '../Player/PlayerSaga';

export default function* rootSaga() {
  yield all([
    ...listSaga,
    ...headerSaga,
    ...playerSaga
  ]);
}
