import React, { Component } from 'react';

class AuthJoinForm extends Component {
  render() {
    return (
      <div className="join-form">
        <input type="text" placeholder="이메일"/>
        <input type="password" placeholder="비밀번호"/>
        <button type="button" className="join-submit-btn">확인</button>
      </div>
    );
  }
}

export default AuthJoinForm;
