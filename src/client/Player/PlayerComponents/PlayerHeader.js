import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerHeader extends Component {
  render() {
    const { handleCloseModal } = this.props;

    return (
      <div className="player-header">
        <div className="player-header-playerBtn">
          <i className="fa fa-youtube-play" aria-hidden="true" />
          Player
        </div>
        <div className="player-header-createBtn">
          <i className="fa fa-plus-square" aria-hidden="true" />
          Create list
        </div>
        <div className="player-header-underbar"></div>
        <div className="player-header-close" onClick={handleCloseModal}>
          <i className="fa fa-times" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

PlayerHeader.propTypes = {
  handleCloseModal: PropTypes.func
};

export default PlayerHeader;
