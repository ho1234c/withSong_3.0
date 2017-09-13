import createActions from '../utils/createAction';

export const AUTH_SIGN_IN_REQUEST = 'auth/AUTH_SIGN_IN_REQUEST';
export const AUTH_SIGN_IN_SUCCESS = 'auth/AUTH_SIGN_IN_SUCCESS';
export const AUTH_SIGN_IN_FAILURE = 'auth/AUTH_SIGN_IN_FAILURE';
export const AUTH_JOIN_REQUEST = 'auth/AUTH_JOIN_REQUEST';
export const AUTH_JOIN_SUCCESS = 'auth/AUTH_JOIN_SUCCESS';
export const AUTH_JOIN_FAILURE = 'auth/AUTH_JOIN_FAILURE';
export const AUTH_OPEN = 'auth/AUTH_OPEN';
export const AUTH_CLOSE = 'auth/AUTH_CLOSE';

export const authModal = {
  open: () => createActions(AUTH_OPEN),
  close: () => createActions(AUTH_CLOSE)
};

export const signIn = {
  request: user => createActions(AUTH_SIGN_IN_REQUEST, { user }),
  success: response => createActions(AUTH_SIGN_IN_SUCCESS, { response }),
  failure: error => createActions(AUTH_SIGN_IN_FAILURE, { error })
};

export const join = {
  request: user => createActions(AUTH_JOIN_REQUEST, { user }),
  success: response => createActions(AUTH_JOIN_SUCCESS, { response }),
  failure: error => createActions(AUTH_JOIN_FAILURE, { error })
};
