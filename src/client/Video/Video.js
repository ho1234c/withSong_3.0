import React, { Component } from 'react';
import Youtube from 'react-youtube';
import { connect } from 'react-redux';
import { video } from './VideoActions';
import './Video.css';

class Video extends Component {
  render() {
    const opts = {
      width: '240',
      height: '180',
      playerVars: {
        autoplay: 1
      }
    };

    const { videoId, videoEnd } = this.props;

    if(!videoId) {
      return <div></div>;
    }

    return (
      <div id="video-container">
        <Youtube videoId={videoId} className="youtube" opts={opts} onEnd={videoEnd}/>
      </div>
    );
  }
}

export default connect(
  state => ({
    videoId: state.video.videoId
  }),
  dispatch => ({
    videoEnd: () => dispatch(video.end())
  })
)(Video);
