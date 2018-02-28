import React, { Component } from 'react';
import path from 'path';
import moment from 'moment';
import './Album.scss';

class Album extends Component {
  render() {
    const { album, openModal } = this.props;
    const { name, detail, maker } = album;
    const thumbnail = JSON.parse(album.thumbnail);
    const createdAt = moment(album.createdAt).format('ll');

    return (
      <div className="masonry-item" onClick={() => openModal(album)}>
        <div className="thumbnail">
          <img src={path.join('thumbnails', thumbnail.src)} alt="thumbnail" />
        </div>
        <div className="album-header">
          <div className="name">{name}</div>
          <div className="created">{createdAt}</div>
        </div>
        <div className="album-body">
          <div className="detail">{detail}</div>
        </div>
        <div className="album-footer">
          <div className="maker">{maker.nickname}</div>
        </div>
      </div>
    );
  }
}

export default Album;
