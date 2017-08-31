import React, { Component } from 'react';

class Body extends Component {
  render() {
    const { songInfo } = this.props;
    console.log(songInfo);
    const components = songInfo.map((song, key) =>
      <div key={key} className="list-song-body-component">
        <div className="list-song-body-thumbnail">
          <img src={song.snippet.thumbnails.default.url} />
        </div>
        <div className="list-song-body-title">
          {song.snippet.title}
        </div>
      </div>
    );

    return (
      <div className="list-song-body">
        {components}
      </div>
    );
  }
}

export default Body;
