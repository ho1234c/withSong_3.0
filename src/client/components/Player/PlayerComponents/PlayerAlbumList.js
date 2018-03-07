import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerAlbum from './PlayerAlbum';

class PlayerAlbumList extends Component {
  render() {
    const { list, getSong } = this.props;
    const components = list.map((album, key) =>
      <PlayerAlbum key={key} ckey={key + 1} album={album} getSong={getSong} />);

    return (
      <div className="player-list">
        {components}
      </div>
    );
  }
}

PlayerAlbumList.propTypes = {
  list: PropTypes.array.isRequired,
  getSong: PropTypes.func.isRequired
};

export default PlayerAlbumList;
