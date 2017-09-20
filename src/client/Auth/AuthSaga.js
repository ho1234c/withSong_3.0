import { call, put, take, fork, race } from 'redux-saga/effects';
import * as AuthActions from './AuthActions';
import { auth } from '../utils/fetch';

function* signIn(user) {
  try {
    return yield call(auth.login, user);
  }catch(error) {
    yield put(AuthActions.signIn.failure(error));
    return false;
  }
}

function* loginFlow() {
  while(true) {
    const request = yield take(AuthActions.AUTH_SIGN_IN_REQUEST);
    const { email, password } = request.payload.user;

    const winner = yield race({
      signIn: call(signIn, { email, password }),
      logout: take(AuthActions.AUTH_LOGOUT_REQUEST)
    });

    if(winner.signIn) {
      yield put(AuthActions.signIn.success(winner.signIn.data.user));
    }
  }
}

function* join(user) {
  try {
    return yield call(auth.register, user);
  }catch(error) {
    yield put(AuthActions.join.failure(error));
  }
}

function* joinFlow() {
  while(true) {
    const request = yield take(AuthActions.AUTH_JOIN_REQUEST);
    const { email, password, nickname } = request.payload.user;

    try {
      const response = yield call(join, { email, password, nickname });
      yield put(AuthActions.join.success(response.data.user));
    }catch(error) {
      yield put(AuthActions.join.failure(error));
    }
  }
}

export function* logoutFlow() {
  while(true) {
    yield take(AuthActions.AUTH_LOGOUT_REQUEST);
    yield put(AuthActions.logout.request());
    try {
      yield call(auth.logout);

      yield put(AuthActions.logout.success());
    }catch(error) {
      yield put(AuthActions.logout.failure(error));
    }
  }
}

export const authSaga = [
  fork(loginFlow),
  fork(joinFlow),
  fork(logoutFlow)
];
