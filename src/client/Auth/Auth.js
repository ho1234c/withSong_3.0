import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { authModal } from './AuthActions';
import AuthSignInForm from './AuthSignInForm';
import AuthJoinForm from './AuthJoinForm';
import './Auth.css';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'left'
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
    const { isOpen } = this.props.auth;
    const { active } = this.state;
    const form = active === 'left' ? <AuthSignInForm/> : <AuthJoinForm/>;
    const modalContent =
    <div className="auth">
      <div className="auth-header">
        <div className={`auth-left-button ${active === 'left' ? 'active' : ''}`}
          onClick={() => this.changeTab('left')}>
          <div className="sign-in">로그인</div>
        </div>
        <div className={`auth-right-button ${active === 'right' ? 'active' : ''}`}
          onClick={() => this.changeTab('right')}>
          <div className="join">회원가입</div>
        </div>
      </div>
      <div className="auth-bar"></div>
      <div className="auth-body">
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
    authModalClose: () => dispatch(authModal.close())
  })
)(Auth);
