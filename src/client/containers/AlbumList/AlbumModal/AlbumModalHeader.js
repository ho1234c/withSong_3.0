import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class AlbumModalHeader extends Component {
  render() {
    const { name, createdAt } = this.props;

    return (
      <div className="album-modal-header">
        <div className="album-modal-header-name">{name}</div>
        <div className="album-modal-header-created">{moment(createdAt).format('ll')}</div>
        <div className="album-modal-header-close">
          <i className="fa fa-times" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

AlbumModalHeader.propTypes = {
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default AlbumModalHeader;
