import React, { Component } from 'react';

class AuthJoinForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      'password-retype': '',
      nickname: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="join-form">
        <input type="text" name="email" placeholder="이메일" onChange={this.handleChange}/>
        <input type="password" name="password" placeholder="비밀번호" onChange={this.handleChange}/>
        <input type="password" name="password-retype" placeholder="비밀번호 확인"
          onChange={this.handleChange}/>
        <input type="text" name="nickname" placeholder="닉네임" onChange={this.handleChange}/>
        <button type="button" className="join-submit-btn">가입</button>
        <button type="button" className="facebook-join-btn">페이스북으로 가입</button>
      </div>
    );
  }
}

export default AuthJoinForm;
