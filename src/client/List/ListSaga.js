import{ call, put, takeEvery } from'redux-saga/effects';
import{ fetchList } from'./ListService';
import* as actions from'./ListActions';

function* getList(action) {
  try{
    const list = yield call(fetchList, action.payload);
    yield put(actions.getList.success(list));
  } catch(error) {
    yield put(actions.getList.failure(error));
  }
}

export function* watchGetList() {
  yield takeEvery(actions.LIST_REQUEST, getList);
}