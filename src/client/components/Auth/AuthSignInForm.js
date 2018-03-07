import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AuthSignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    this.props.signIn(this.state);
  }

  render() {
    return (
      <div className="sign-in-form">
        <input type="text" placeholder="이메일" name="email" onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <input type="password" placeholder="비밀번호" name="password" onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <button type="button" className="email-login-btn" onClick={this.handleSubmit}>
          이메일로 로그인
        </button>
        <button type="button" className="facebook-login-btn">페이스북으로 로그인</button>
      </div>
    );
  }
}

AuthSignInForm.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default AuthSignInForm;
