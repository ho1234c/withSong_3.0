import React, { Component } from 'react';
import isEmpty from 'lodash-es/isEmpty';
import PropTypes from 'prop-types';
import PlayerSongItem from './PlayerSongItem';

class PlayerSong extends Component {
  constructor(props) {
    super(props);

    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay(...params) {
    const { songs, playSong } = this.props;

    playSong(...params, songs.id);
  }

  render() {
    const { songs } = this.props;
    const components = isEmpty(songs) ? '' : songs.songInfo.map((song, key) =>
      <PlayerSongItem key={key} song={song} handlePlay={this.handlePlay} />);

    return (
      <div className="player-song">
        {components}
      </div>
    );
  }
}

PlayerSong.propTypes = {
  songs: PropTypes.object.isRequired,
  playSong: PropTypes.func.isRequired
};

export default PlayerSong;
