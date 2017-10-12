import React, { Component } from 'react';
import { connect } from 'react-redux';
import Youtube from 'react-youtube';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { video } from './VideoActions';
import './Video.css';

class Video extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
      volume: 50,
      isMuted: false,
      isHide: false
    };

    this.onReady = this.onReady.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onMute = this.onMute.bind(this);
    this.hideToggle = this.hideToggle.bind(this);
  }

  onReady(event) {
    const player = event.target;

    player.unMute();
    player.setVolume(this.state.volume);
    this.setState({
      player
    });
  }

  onChange(value) {
    this.setState({
      volume: value,
      isMuted: value === 0
    });

    this.state.player.setVolume(value);
  }

  onMute() {
    this.setState({
      isMuted: !this.state.isMuted
    }, () => {
      const { volume, player, isMuted } = this.state;
      const vol = isMuted ? 0 : volume;

      player.setVolume(vol);
    });
  }

  hideToggle() {
    this.setState({
      isHide: !this.state.isHide
    });
  }

  render() {
    const opts = {
      width: '240',
      height: '180',
      playerVars: {
        autoplay: 1
      }
    };
    const { videoId, videoEnd } = this.props;
    const { isHide, isMuted, volume } = this.state;
    const volumeBtn = this.state.isMuted ?
      <i className="fa fa-volume-off" aria-hidden="true" onClick={this.onMute}></i> :
      <i className="fa fa-volume-up" aria-hidden="true" onClick={this.onMute}></i>;
    const hideBtn = this.state.isHide ?
      <i className="fa fa-caret-up" aria-hidden="true"></i> :
      <i className="fa fa-caret-down" aria-hidden="true"></i>;
    const handleStyle = {
      border: false,
      height: 12,
      width: 12,
      marginLeft: -6,
      marginTop: -4
    };

    if(!videoId) {
      return <div></div>;
    }

    return (
      <div className={`video-container ${isHide ? 'hide' : ''}`}>
        <div className="video-header">
          <div className="layout-controller" onClick={this.hideToggle}>
            {hideBtn}
          </div>
          <div className="volume-controller">
            {volumeBtn}
            <Slider className="slider" value={isMuted ? 0 : volume}
              onChange={this.onChange} min={0} max={100} handleStyle={handleStyle}/>
          </div>
        </div>
        <Youtube videoId={videoId} className="youtube" opts={opts} onEnd={videoEnd}
          onReady={this.onReady}/>
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
