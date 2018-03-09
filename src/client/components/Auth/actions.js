import createActions from '../../utils/createAction';

export const AUTH_SIGN_IN_REQUEST = 'auth/AUTH_SIGN_IN_REQUEST';
export const AUTH_SIGN_IN_SUCCESS = 'auth/AUTH_SIGN_IN_SUCCESS';
export const AUTH_LOGOUT_REQUEST = 'auth/AUTH_LOGOUT';
export const AUTH_LOGOUT_SUCCESS = 'auth/AUTH_LOGOUT';
export const AUTH_JOIN_REQUEST = 'auth/AUTH_JOIN_REQUEST';
export const AUTH_JOIN_SUCCESS = 'auth/AUTH_JOIN_SUCCESS';
export const GET_SESSION_REQUEST = 'auth/GET_SESSION_REQUEST';
export const GET_SESSION_SUCCESS = 'auth/GET_SESSION_SUCCESS';
export const AUTH_REQUEST_FAILURE = 'auth/AUTH_REQUEST_FAILURE';
export const AUTH_OPEN = 'auth/AUTH_OPEN';
export const AUTH_CLOSE = 'auth/AUTH_CLOSE';

export const authModal = {
  open: () => createActions(AUTH_OPEN),
  close: () => createActions(AUTH_CLOSE)
};

export const signIn = {
  request: user => createActions(AUTH_SIGN_IN_REQUEST, { user }),
  success: response => createActions(AUTH_SIGN_IN_SUCCESS, { response }),
  failure: error => createActions(AUTH_REQUEST_FAILURE, { error })
};

export const join = {
  request: user => createActions(AUTH_JOIN_REQUEST, { user }),
  success: response => createActions(AUTH_JOIN_SUCCESS, { response }),
  failure: error => createActions(AUTH_REQUEST_FAILURE, { error })
};

export const logout = {
  request: () => createActions(AUTH_LOGOUT_REQUEST),
  success: () => createActions(AUTH_LOGOUT_SUCCESS),
  failure: error => createActions(AUTH_REQUEST_FAILURE, { error })
};

export const session = {
  request: () => createActions(GET_SESSION_REQUEST),
  success: response => createActions(GET_SESSION_SUCCESS, { response }),
  failure: error => createActions(AUTH_REQUEST_FAILURE, { error })
};
