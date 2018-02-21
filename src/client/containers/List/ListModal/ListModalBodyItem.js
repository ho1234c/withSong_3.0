import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListModalBodyItem extends Component {
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
    const bodyClass = `list-modal-body-component${(this.state.isHover ? ' hover' : '')}`;

    return (
      <div
        className={`${bodyClass}${song.isNowPlaying ? ' nowPlaying' : ''}`}
        onClick={() => this.handleClick(song.videoId, song.key)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="list-modal-body-thumbnail">
          <img src={song.snippet.thumbnails.default.url} alt="thumbnail" />
        </div>
        <div className="list-modal-body-title">
          {song.snippet.title}
        </div>
      </div>
    );
  }
}

ListModalBodyItem.propTypes = {
  song: PropTypes.object.isRequired,
  handlePlay: PropTypes.func.isRequired
};

export default ListModalBodyItem;
