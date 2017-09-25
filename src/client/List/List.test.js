import { call, put, select, take, takeEvery, fork } from 'redux-saga/effects';
import { fetchList, fetchSong } from '../utils/fetch';
import * as listActions from './ListActions';
import * as listSaga from './ListSaga';

jest.mock('../__mocks__/fetch');

describe('listSaga - getList', () => {
  const generator = listSaga.getList(listActions.getList.request());
  
  it('it should wait for request to list', () => {
    expect(generator.next().value)
      .toEqual(call(fetchList, listActions.getList.request().payload));
  });

  it('dispatch an action for success of list request', () => {
    const resource = { resource : '' };

    expect(generator.next({ data: resource }).value)
      .toEqual(put(listActions.getList.success(resource)));
  });

  it('done', () => {
    expect(generator.next().done).toBe(true)
  });
});