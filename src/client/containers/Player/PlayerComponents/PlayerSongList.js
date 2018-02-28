import React, { Component } from 'react';
import isEmpty from 'lodash-es/isEmpty';
import PropTypes from 'prop-types';
import PlayerSong from './PlayerSong';

class PlayerSongList extends Component {
  constructor(props) {
    super(props);

    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay(...params) {
    const { album, playSong } = this.props;

    playSong(...params, album.id);
  }

  render() {
    const { album } = this.props;
    const components = isEmpty(album) ? '' : album.contents.map((song, key) =>
      <PlayerSong key={key} song={song} handlePlay={this.handlePlay} />);

    return (
      <div className="player-song">
        {components}
      </div>
    );
  }
}

PlayerSongList.propTypes = {
  album: PropTypes.object.isRequired,
  playSong: PropTypes.func.isRequired
};

export default PlayerSongList;
