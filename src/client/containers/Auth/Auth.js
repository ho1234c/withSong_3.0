import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Spinner from 'react-spinkit';
import { authModal, signIn, join, logout } from './actions';
import AuthSignInForm from './AuthSignInForm';
import AuthJoinForm from './AuthJoinForm';
import './Auth.scss';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.MODE = {
      SIGNIN: 'signIn',
      JOIN: 'join'
    };
    this.state = {
      active: this.MODE.SIGNIN
    };
    this.changeTab = this.changeTab.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  changeTab(mode) {
    this.setState({
      active: mode
    });
  }

  handleCloseModal() {
    this.props.authModalClose();
  }

  render() {
    const { isOpen, isLoading } = this.props.auth;
    const { signInRequest, joinRequest } = this.props;
    const { active } = this.state;
    const { MODE } = this;
    const form = active === MODE.SIGNIN ?
      <AuthSignInForm signIn={signInRequest} /> : <AuthJoinForm join={joinRequest} />;
    const modalContent = (
      <div className="auth">
        <div className="auth-header">
          <div
            className={`auth-header-leftBtn ${active === MODE.SIGNIN ? 'active' : ''}`}
            onClick={() => this.changeTab(MODE.SIGNIN)}
          >
            <div className="sign-in">로그인</div>
          </div>
          <div
            className={`auth-header-rightBtn ${active === MODE.JOIN ? 'active' : ''}`}
            onClick={() => this.changeTab(MODE.JOIN)}
          >
            <div className="join">회원가입</div>
          </div>
          <div className={`auth-header-underbar ${active}`} />
        </div>
        <div className="auth-bar" />
        <div className="auth-body">
          {isLoading ? <Spinner name="line-scale-pulse-out-rapid" fadeIn="none" className="auth-spinner" /> : ''}
          {form}
        </div>
      </div>);

    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick
        onRequestClose={this.handleCloseModal}
        contentLabel="Modal"
        className="auth-modal"
        overlayClassName="overlay"
      >
        {modalContent}
      </Modal>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth
  }),
  dispatch => ({
    authModalClose: () => dispatch(authModal.close()),
    signInRequest: user => dispatch(signIn.request(user)),
    joinRequest: user => dispatch(join.request(user)),
    logoutRequest: () => dispatch(logout.request())
  })
)(Auth);
