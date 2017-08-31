import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchList, fetchSong } from '../services/fetch';
import * as actions from './ListActions';

function* getList(action) {
  try {
    const response = yield call(fetchList, action.payload);
    yield put(actions.getList.success(response.data));
  }catch(error) {
    yield put(actions.getList.failure(error));
  }
}

function* getSong(action) {
  try {
    const response = yield call(fetchSong, action.payload);
    yield put(actions.getSong.success(response.data));
  }catch(error) {
    yield put(actions.getSong.failure(error));
  }
}

export function* watchGetList() {
  yield takeEvery(actions.LIST_REQUEST, getList);
}

export function* watchGetSong() {
  yield takeEvery(actions.SONG_REQUEST, getSong);
}
