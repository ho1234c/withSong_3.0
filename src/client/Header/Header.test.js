import { delay } from 'redux-saga';
import { take, call, put, takeLatest, fork } from 'redux-saga/effects';
import * as actions from './HeaderActions';
import { getList } from '../List/ListActions';
import * as HeaderSaga from './HeaderSaga';

describe('HeaderSaga', () => {
  describe('when scroll event occurs, determine whether header is shown', () => {
    it('take toggle event with blocking', () => {

    });

    it('if direction of scroll event is down, show header', () => {
      
    });

    it('if direction of scroll event is up, hide header', () => {
      
    });

    it('done', () => {

    });
  });

  describe('when user change search word, send request for list search.', () => {
    it('take lastest search word change action', () => {
      
    });

    it('wait 1000ms because there may be additional input.', () => {
      
    });

    it('put request start action', () => {
      
    });

    it('send search request with word.', () => {
      
    });

    it('put request end action', () => {
      
    });

    it('done', () => {
      
    });
  });
});