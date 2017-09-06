import React, { Component } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import './ListSong.css';

class ListSong extends Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay(...params) {
    const { list, playSong } = this.props;

    playSong(...params, list.id);
  }

  render() {
    const { name, createdAt, like, songInfo } = this.props.list;
    const { handleCloseModal } = this.props;

    return (
      <div className="list-song">
        <Header name={name} createdAt={createdAt} handleCloseModal={handleCloseModal}/>
        <div className="list-song-bar"></div>
        <Body songInfo={songInfo} handlePlay={this.handlePlay}/>
        <Footer like={like} length={songInfo.length}/>
        <div className="list-song-comment"></div>
      </div>
    );
  }
}

export default ListSong;
