import { call, put, take, fork, race, takeEvery } from 'redux-saga/effects';
import * as AuthActions from './actions';
import { auth } from '../../utils/fetch';

export function* signIn(user) {
  try {
    return yield call(auth.login, user);
  } catch (error) {
    yield put(AuthActions.signIn.failure(error));
    return false;
  }
}

export function* loginFlow() {
  while (true) {
    const request = yield take(AuthActions.AUTH_SIGN_IN_REQUEST);
    const { email, password } = request.payload.user;

    const winner = yield race({
      signIn: call(signIn, { email, password }),
      logout: take(AuthActions.AUTH_LOGOUT_REQUEST)
    });

    if (winner.signIn) {
      yield put(AuthActions.signIn.success(winner.signIn.data.user));
    }
  }
}

export function* session() {
  try {
    const response = yield call(auth.session);
    console.log(response);
    if (response.data) {
      yield put(AuthActions.session.success(response.data));
    } else {
      throw new Error('have no session');
    }
  } catch (error) {
    yield put(AuthActions.session.failure(error));
  }
}

export function* join(user) {
  try {
    return yield call(auth.register, user);
  } catch (error) {
    return yield put(AuthActions.join.failure(error));
  }
}

export function* joinFlow() {
  while (true) {
    const request = yield take(AuthActions.AUTH_JOIN_REQUEST);
    const { email, password, nickname } = request.payload.user;

    try {
      const response = yield call(join, { email, password, nickname });
      yield put(AuthActions.join.success(response.data.user));
    } catch (error) {
      yield put(AuthActions.join.failure(error));
    }
  }
}

export function* logoutFlow() {
  while (true) {
    yield take(AuthActions.AUTH_LOGOUT_REQUEST);
    yield put(AuthActions.logout.request());
    try {
      yield call(auth.logout);

      yield put(AuthActions.logout.success());
    } catch (error) {
      yield put(AuthActions.logout.failure(error));
    }
  }
}

export function* watchSession() {
  yield takeEvery(AuthActions.GET_SESSION_REQUEST, session);
}

export default [
  fork(loginFlow),
  fork(joinFlow),
  fork(logoutFlow),
  fork(watchSession)
];
