import React, { Component } from 'react';

class Body extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(videoId, key) {
    this.props.playSong(videoId, key);
  }

  render() {
    const { songInfo } = this.props;

    const components = songInfo.map(song =>
      (<div key={song.key} className={`list-song-body-component${(song.isNowPlaying ? ' nowPlaying' : '')}`}
        onClick={() => this.handleClick(song.videoId, song.key)}>
        <div className="list-song-body-thumbnail">
          <img src={song.snippet.thumbnails.default.url} />
        </div>
        <div className="list-song-body-title">
          {song.snippet.title}
        </div>
      </div>)
    );

    return (
      <div className="list-song-body">
        {components}
      </div>
    );
  }
}

export default Body;
