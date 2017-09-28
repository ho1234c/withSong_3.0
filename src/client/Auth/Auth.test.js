import { call, put, take, fork, race } from 'redux-saga/effects';
import * as AuthActions from './AuthActions';
import { auth } from '../utils/fetch';
import * as AuthSaga from './AuthSaga';

describe('AuthSaga', () => {
  describe('LoginFlow', () => {
    it('take SignIn request event', () => {

    });

    it('SignIn request racing Logout request', () => {

    });

    it(`if SingIn reqeust is winner, put request success action`, () => {

    });

    it(`if Logout request is winner or put request success action is end, done`, () => {

    });
  });

  describe('LogoutFlow', () => {
    it('take Logout request event', () => {

    });

    it('put Logout action', () => {

    });

    it('call Logout reqeust', () => {

    });

    it('put Logout success action', () => {

    });
  });

  describe('JoinFlow', () => {
    it('take Join request event', () => {

    });

    it('call Join request', () => {

    });

    it(`put Join success action`, () => {

    });
  });
});  
