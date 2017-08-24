import createActions from '../Utils/createAction';

export const LIST_REQUEST = 'LIST_REQUEST';
export const LIST_SUCCESS = 'LIST_SUCCESS';
export const LIST_FAILURE = 'LIST_FAILURE';

export const getList = {
  request: (word, num) => createActions(LIST_REQUEST, { word, num }),
  success: response => createActions(LIST_SUCCESS, { response }),
  failure: error => createActions(LIST_FAILURE, { error })
};
