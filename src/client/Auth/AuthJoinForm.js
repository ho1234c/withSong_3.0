import React, { Component } from 'react';

class AuthJoinForm extends Component {
  render() {
    return (
      <div className="join-form">
        <input type="text" placeholder="이메일"/>
        <input type="password" placeholder="비밀번호"/>
        <input type="password" placeholder="비밀번호 확인"/>
        <input type="text" placeholder="이름"/>
        <button type="button" className="join-submit-btn">가입</button>
        <button type="button" className="facebook-join-btn">페이스북으로 가입</button>
      </div>
    );
  }
}

export default AuthJoinForm;
