import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    console.log('test');
  }


  render() {
    return (
      <div id="header">
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

export default Header;
