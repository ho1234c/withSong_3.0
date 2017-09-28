import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Spinner from 'react-spinkit';
import { authModal, signIn, join, logout } from './AuthActions';
import AuthSignInForm from './AuthSignInForm';
import AuthJoinForm from './AuthJoinForm';
import './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'signIn'
    };
    this.changeTab = this.changeTab.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  changeTab(direction) {
    this.setState({
      active: direction
    });
  }

  handleCloseModal() {
    this.props.authModalClose();
  }

  render() {
    const { isOpen, isLoading } = this.props.auth;
    const { signInRequest, joinRequest } = this.props;
    const { active } = this.state;
    const form = active === 'signIn' ?
      <AuthSignInForm signIn={signInRequest}/> : <AuthJoinForm join={joinRequest}/>;
    const modalContent =
    <div className="auth">
      <div className="auth-header">
        <div className={`auth-header-leftBtn ${active === 'signIn' ? 'active' : ''}`}
          onClick={() => this.changeTab('signIn')}>
          <div className="sign-in">로그인</div>
        </div>
        <div className={`auth-header-rightBtn ${active === 'join' ? 'active' : ''}`}
          onClick={() => this.changeTab('join')}>
          <div className="join">회원가입</div>
        </div>
        <div className={`auth-header-underbar ${active}`}></div>
      </div>
      <div className="auth-bar"></div>
      <div className="auth-body">
        {isLoading ? <Spinner name="line-scale-pulse-out-rapid" fadeIn="none" className="auth-spinner" /> : ''}
        {form}
      </div>
    </div>;

    return (
      <Modal isOpen={isOpen} shouldCloseOnOverlayClick={true} onRequestClose={this.handleCloseModal}
        contentLabel="Modal" className="auth-modal" overlayClassName="overlay">
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
