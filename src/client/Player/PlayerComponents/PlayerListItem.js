import React, { Component } from 'react';
import PropTypes from 'prop-types';
import path from 'path';

class PlayerListItem extends Component {
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
    const { list } = this.props;
    const bodyClass = `player-list-component${(this.state.isHover ? ' hover' : '')}`;
    const thumbnail = JSON.parse(list.thumbnail);

    return (
      <div className={`${bodyClass}${list.isNowPlaying ? ' nowSelected' : ''}`}
        onClick={() => this.handleClick(list.id)}>
        <div className="player-list-thumbnail">
          <img src={path.join('thumbnails', thumbnail.src)} />
        </div>
        <div className="player-list-title">
          {list.name}
        </div>
      </div>
    );
  }
}

PlayerListItem.propTypes = {
  list: PropTypes.object,
  getSong: PropTypes.func
};

export default PlayerListItem;
