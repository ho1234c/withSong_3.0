import React, { Component } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import './ListSong.css';

class ListSong extends Component {
  render() {
    const { name, createdAt, like, songInfo } = this.props.list;

    return (
      <div className="list-song">
        <Header name={name} createdAt={createdAt}/>
        <div className="list-song-bar"></div>
        <Body songInfo={songInfo} />
        <Footer like={like} />
        <div className="list-song-comment"></div>
      </div>
    );
  }
}

export default ListSong;
