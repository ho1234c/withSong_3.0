import React, { Component } from 'react';

class Footer extends Component {
  render() {
    const { like, length } = this.props;

    return (
      <div className="list-song-footer">
        <div className="list-song-footer-length">{length}곡</div>
        <div className="list-song-footer-like">{like}명이 좋아합니다</div>
        <div className="list-song-footer-favorite">
          <i className="fa fa-heart-o" aria-hidden="true" />ADD TO LIST
        </div>
      </div>
    );
  }
}

export default Footer;
