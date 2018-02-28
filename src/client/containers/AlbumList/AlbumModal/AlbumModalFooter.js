import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumModalFooter extends Component {
  render() {
    const { like, length } = this.props;

    return (
      <div className="album-modal-footer">
        <div className="album-modal-footer-length">{length}곡</div>
        <div className="album-modal-footer-like">{like}명이 좋아합니다</div>
        <div className="album-modal-footer-favorite">
          <i className="fa fa-heart-o" aria-hidden="true" />ADD TO LIST
        </div>
      </div>
    );
  }
}

AlbumModalFooter.propTypes = {
  like: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired
};

export default AlbumModalFooter;
