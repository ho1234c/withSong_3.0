import React, { Component } from 'react';

class AuthSignInForm extends Component {
  render() {
    return (
      <div className="sign-in-form">
        <input type="text" placeholder="이메일"/>
        <input type="password" placeholder="비밀번호"/>
        <button type="button" className="email-login-btn">이메일로 로그인</button>
        <button type="button" className="facebook-login-btn">페이스북으로 로그인</button>
      </div>
    );
  }
}

export default AuthSignInForm;
