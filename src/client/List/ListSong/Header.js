import React, { Component } from 'react';
import moment from 'moment';

class Header extends Component {
  render() {
    const { name, createdAt, handleCloseModal } = this.props;

    return (
      <div className="list-song-header">
        <div className="list-song-header-name">{name}</div>
        <div className="list-song-header-created">{moment(createdAt).format('ll')}</div>
        <div className="list-song-header-close" onClick={handleCloseModal}>
          <i className="fa fa-times" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

export default Header;
