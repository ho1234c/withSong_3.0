import { call, put, take, fork, race } from 'redux-saga/effects';
import { auth } from '../utils/fetch';
import * as AuthActions from './AuthActions';
import * as AuthSaga from './AuthSaga';

describe('AuthSaga', () => {
  describe('LoginFlow', () => {
    const gen = AuthSaga.loginFlow();

    it('take SignIn request event', () => {
      expect(gen.next().value)
        .toEqual(take(AuthActions.AUTH_SIGN_IN_REQUEST));
    });

    it('SignIn request racing Logout request', () => {
      const fakeUser = { email: 'test', password: 'test' };      
      const fakeAction = AuthActions.signIn.request(fakeUser);

      expect(gen.next(fakeAction).value)
        .toEqual(race({
          signIn: call(AuthSaga.signIn, fakeUser),
          logout: take(AuthActions.AUTH_LOGOUT_REQUEST)
        }));
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
