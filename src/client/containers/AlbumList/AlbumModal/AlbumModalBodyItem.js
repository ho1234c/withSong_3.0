import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AlbumModalBodyItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false
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
    const bodyClass = `album-modal-body-component${(this.state.isHover ? ' hover' : '')}`;

    return (
      <div
        className={`${bodyClass}${song.isNowPlaying ? ' nowPlaying' : ''}`}
        onClick={() => this.handleClick(song.videoId, song.key)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="album-modal-body-thumbnail">
          <img src={song.snippet.thumbnails.default.url} alt="thumbnail" />
        </div>
        <div className="album-modal-body-title">
          {song.snippet.title}
        </div>
      </div>
    );
  }
}

AlbumModalBodyItem.propTypes = {
  song: PropTypes.object.isRequired,
  handlePlay: PropTypes.func.isRequired
};

export default AlbumModalBodyItem;
