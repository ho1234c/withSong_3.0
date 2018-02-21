import React, { Component } from 'react';
import path from 'path';
import moment from 'moment';
import './ListItem.scss';

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.getSong(this.props.song.id);
  }

  render() {
    const { song } = this.props;
    const { name, detail, maker } = song;
    const thumbnail = JSON.parse(song.thumbnail);
    const createdAt = moment(song.createdAt).format('ll');

    return (
      <div className="masonry-item" onClick={this.handleClick}>
        <div className="thumbnail">
          <img src={path.join('thumbnails', thumbnail.src)} alt="thumbnail" />
        </div>
        <div className="list-header">
          <div className="name">{name}</div>
          <div className="created">{createdAt}</div>
        </div>
        <div className="list-body">
          <div className="detail">{detail}</div>
        </div>
        <div className="list-footer">
          <div className="maker">{maker.nickname}</div>
        </div>
      </div>
    );
  }
}

export default ListItem;
