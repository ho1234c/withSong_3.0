import React, { Component } from'react';
import{ connect } from'react-redux';
import{ header } from'./HeaderActions';
import'./Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.lastPos = 0; // for detecting scroll direction
    // this.tranStyle = { transform: 'transformY(0%)' };
    this.tranStyle = { background: '#111' };
  }

  componentDidMount() {
    this.handleScroll = this.handleScroll.bind(this);

    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const currentPos = window.pageYOffset;

    if(currentPos > this.lastPos) {
      this.props.scroll('up');
    } else{
      this.props.scroll('down');
    }

    this.lastPos = currentPos;
  }

  render() {
    const { isShow } = this.props.header;
    console.log(isShow);
    return(
      <div id="header" style={{ transform: isShow ? 'translateY(0)' : 'translateY(-100%)' }}>
        <div id="header-logo">로고</div>
        <div id="header-search">
          <i className="fa fa-search" aria-hidden="true"></i>
          <input name="search" placeholder="검색하기" />
        </div>
        <div id="header-button">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
          <i className="fa fa-outdent" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    header: state.headerReducer
  }),
  dispatch => ({
    scroll: direction => dispatch(header.scroll(direction))
  })
)(Header);
