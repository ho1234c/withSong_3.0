import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlayerSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleClick(videoId, key) {
    this.props.handlePlay(videoId, key);
  }

  handleMouseEnter() {
    this.setState({
      isHover: true
    });
  }

  handleMouseLeave() {
    this.setState({
      isHover: false
    });
  }

  render() {
    const { song } = this.props;
    const bodyClass = `player-song-component${(this.state.isHover ? ' hover' : '')}`;

    return (
      <div
        className={`${bodyClass}${song.isNowPlaying ? ' nowPlaying' : ''}`}
        onClick={() => this.handleClick(song.videoId, song.key)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="player-song-thumbnail">
          <img src={song.snippet.thumbnails.default.url} alt="thumbnail" />
        </div>
        <div className="player-song-title">
          {song.snippet.title}
        </div>
      </div>
    );
  }
}

PlayerSong.propTypes = {
  song: PropTypes.objectOf(PropTypes.string).isRequired,
  handlePlay: PropTypes.func.isRequired
};

export default PlayerSong;
