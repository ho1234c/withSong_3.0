import { call, put, take, takeEvery, fork, race } from 'redux-saga/effects';
import * as AuthActions from './AuthActions';
import { auth } from '../utils/fetch';

function* signIn(user) {
  try {
    return yield call(auth.login, user);
  } catch (error) {
    yield put(AuthActions.signIn.failure(error));
    return false;
  }
}

export function* loginFlow (action) {
  while(true) {
    const { email, password } = action.payload;

    const winner = yield race({
      signIn: call(signIn, { email, password }),
      logout: take(AuthActions.AUTH_LOGOUT_REQUEST)
    })

    if (winner.signIn) {
      yield put(AuthActions.AUTH_SIGN_IN_SUCCESS)
    }
  }
}

export function* logoutFlow () {
  while (true) {
    yield take(AuthActions.AUTH_LOGOUT_REQUEST);
    yield put(AuthActions.)

    yield call(auth.logout)
  }
}

function* watchLoginFlow() {
  yield takeEvery(AuthActions.AUTH_SIGN_IN_REQUEST, loginFlow);
}

export const listSaga = [
  fork(watchLoginFlow)
];
