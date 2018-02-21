import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListModalFooter extends Component {
  render() {
    const { like, length } = this.props;

    return (
      <div className="list-modal-footer">
        <div className="list-modal-footer-length">{length}곡</div>
        <div className="list-modal-footer-like">{like}명이 좋아합니다</div>
        <div className="list-modal-footer-favorite">
          <i className="fa fa-heart-o" aria-hidden="true" />ADD TO LIST
        </div>
      </div>
    );
  }
}

ListModalFooter.propTypes = {
  like: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired
};

export default ListModalFooter;
