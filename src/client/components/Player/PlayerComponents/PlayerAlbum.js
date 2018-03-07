import React, { Component } from 'react';
import PropTypes from 'prop-types';
import path from 'path';

class PlayerAlbum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleClick(videoId) {
    this.props.getSong(videoId);
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
    const { album, ckey } = this.props;
    const bodyClass = `player-list-component${(this.state.isHover ? ' hover' : '')}`;
    const thumbnail = JSON.parse(album.thumbnail);

    return (
      <div
        className={`${bodyClass}${album.select ? ' nowSelected' : ''}`}
        onClick={() => this.handleClick(album.id)}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="player-list-id">{ckey}</div>
        <div className="player-list-thumbnail">
          <img src={path.join('thumbnails', thumbnail.src)} alt="thumbnail" />
        </div>
        <div className="player-list-title">
          {album.name}
        </div>
      </div>
    );
  }
}

PlayerAlbum.propTypes = {
  album: PropTypes.object.isRequired,
  getSong: PropTypes.func.isRequired
};

export default PlayerAlbum;
