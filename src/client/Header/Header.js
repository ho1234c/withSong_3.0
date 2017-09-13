import React, { Component } from 'react';
import { connect } from 'react-redux';
import { header, changeSearchInput } from './HeaderActions';
import { playerModal } from '../Player/PlayerActions';
import { authModal } from '../Auth/AuthActions';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.lastPos = 0; // for detecting scroll direction
    this.tranStyle = { background: '#111' };

    this.search = this.search.bind(this);
    this.handleOpenPlayerModal = this.handleOpenPlayerModal.bind(this);
    this.handleOpenAuthModal = this.handleOpenAuthModal.bind(this);
  }

  componentDidMount() {
    this._handleScroll = this._handleScroll.bind(this);
    window.addEventListener('scroll', this._handleScroll);
  }

  _handleScroll() {
    const currentPos = window.pageYOffset;

    if(currentPos === 0 || currentPos < this.lastPos) {
      this.props.scroll('down');
    }else {
      this.props.scroll('up');
    }

    this.lastPos = currentPos;
  }

  handleOpenPlayerModal() {
    this.props.playerModalOpen();
  }

  handleOpenAuthModal() {
    this.props.authModalOpen();
  }

  search(e) {
    this.props.changeSearchInput(e.target.value);
  }

  render() {
    const { isShow } = this.props.header;

    return (
      <div id="header" style={{ transform: isShow ? 'translateY(0)' : 'translateY(-100%)' }}>
        <div id="header-logo">로고</div>
        <div id="header-search">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input name="search" placeholder="검색하기" onChange={this.search} />
        </div>
        <div id="header-button">
          <i className="fa fa-user-circle" aria-hidden="true"
            onClick={this.handleOpenAuthModal}></i>
          <i className="fa fa-outdent" aria-hidden="true"
            onClick={this.handleOpenPlayerModal}></i>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    header: state.header
  }),
  dispatch => ({
    scroll: direction => dispatch(header.scroll(direction)),
    changeSearchInput: word => dispatch(changeSearchInput(word)),
    playerModalOpen: () => dispatch(playerModal.open()),
    authModalOpen: () => dispatch(authModal.open())
  })
)(Header);
