import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class ListModalHeader extends Component {
  render() {
    const { name, createdAt, handleCloseModal } = this.props;

    return (
      <div className="list-modal-header">
        <div className="list-modal-header-name">{name}</div>
        <div className="list-modal-header-created">{moment(createdAt).format('ll')}</div>
        <div className="list-modal-header-close" onClick={handleCloseModal}>
          <i className="fa fa-times" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

ListModalHeader.propTypes = {
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired
};

export default ListModalHeader;
