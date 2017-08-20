import createActions from '../utils/createAction';

export const LIST_REQUEST = 'LIST_REQUEST';
export const LIST_SUCCESS = 'LIST_SUCCESS';
export const LIST_FAILURE = 'LIST_FAILURE';

export const getList = {
  request: num => createActions(LIST_REQUEST, { num }),
  success: response => createActions(LIST_SUCCESS, { response }),
  failure: error => createActions(LIST_FAILURE, { error })
};
