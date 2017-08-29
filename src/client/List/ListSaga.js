import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchList } from '../services/fetch';
import * as actions from './ListActions';

function* getList(action) {
  try{
    const response = yield call(fetchList, action.payload);
    yield put(actions.getList.success(response.data));
  } catch(error) {
    yield put(actions.getList.failure(error));
  }
}

export function* watchGetList() {
  yield takeEvery(actions.LIST_REQUEST, getList);
}
