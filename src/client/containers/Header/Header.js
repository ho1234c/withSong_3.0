import React, { Component } from 'react';
import { connect } from 'react-redux';
import { headerMenu, changeSearchInput } from './actions';
import { playerModal } from '../Player/actions';
import { authModal, logout } from '../Auth/actions';
import './Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.lastPos = 0; // for detecting scroll direction
    this.tranStyle = { background: '#111' };

    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const currentPos = window.pageYOffset;

    if (currentPos === 0 || currentPos < this.lastPos) {
      this.props.scroll('down');
    } else {
      this.props.scroll('up');
    }

    this.lastPos = currentPos;
  }

  search(e) {
    this.props.changeSearchInput(e.target.value);
  }

  render() {
    const {
      header, isAuth, playerModalOpen, authModalOpen, logoutRequest
    } = this.props;
    const authBtn = isAuth ?
      <i className="fa fa-sign-out" aria-hidden="true" onClick={logoutRequest} /> :
      <i className="fa fa-user-circle" aria-hidden="true" onClick={authModalOpen} />;
    const playerBtn = process.env.NODE_ENV !== 'production' || isAuth ?
      <i className="fa fa-outdent" aria-hidden="true" onClick={playerModalOpen} /> : '';


    return (
      <div id="header" style={{ transform: header.isShow ? 'translateY(0)' : 'translateY(-100%)' }}>
        <div id="header-logo">로고</div>
        <div id="header-search">
          <i className="fa fa-search" aria-hidden="true" />
          <input name="search" placeholder="검색하기" onChange={this.search} />
        </div>
        <div id="header-button">
          {authBtn}
          {playerBtn}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    header: state.header,
    isAuth: state.auth.isAuth
  }),
  dispatch => ({
    scroll: direction => dispatch(headerMenu.scroll(direction)),
    changeSearchInput: word => dispatch(changeSearchInput(word)),
    playerModalOpen: () => dispatch(playerModal.open()),
    authModalOpen: () => dispatch(authModal.open()),
    logoutRequest: () => dispatch(logout.request())
  })
)(Header);
