import { all, fork } from 'redux-saga/effects';
import { watchGetList, watchGetSong, nextPlayFlow, watchPlaySong } from '../List/ListSaga';
import { watchScroll, watchSearch } from '../Header/HeaderSaga';

export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchGetSong),
    fork(watchScroll),
    fork(watchSearch),
    fork(nextPlayFlow),
    fork(watchPlaySong)
  ]);
}
