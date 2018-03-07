import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
// import Spinner from 'react-spinkit';
import { getSong, playerModal, getAlbum, play } from './actions';
import Header from './PlayerComponents/PlayerHeader';
import PlayerAlbumList from './PlayerComponents/PlayerAlbumList';
import PlayerSongList from './PlayerComponents/PlayerSongList';
import './Player.scss';

class Player extends Component {
  constructor(props) {
    super(props);

    this.MODE = {
      PLAYER: 'player',
      CREATE: 'create'
    };
    this.state = {
      active: this.MODE.PLAYER
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.getSong = this.getSong.bind(this);
  }

  componentDidMount() {
    // todo: get list from user session
    this.props.getAlbumRequest();
  }

  changeTab(mode) {
    this.setState({
      active: mode
    });
  }

  handleCloseModal() {
    this.props.playerModalClose();
  }

  getSong(id) {
    this.props.getSongRequest(id);
  }

  render() {
    const { playSong } = this.props;
    const { isOpen, list, song } = this.props.player;
    const { MODE } = this;
    const playerBody = (
      <div className="player-body-container">
        <div className="player-body-left">
          <PlayerAlbumList list={list} getSong={this.getSong} />
        </div>
        <div className="player-body-right">
          <PlayerSongList album={song.album} playSong={playSong} />
        </div>
      </div>);
    const createBody = <div className="create-body-container" />;
    // <Spinner name="line-scale-pulse-out-rapid" fadeIn="none" className="modal-spinner"/>;

    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick
        ariaHideApp={false}
        onRequestClose={this.handleCloseModal}
        contentLabel="Modal"
        className="player-modal"
        overlayClassName="overlay"
      >
        <div className="player">
          <Header
            handleCloseModal={this.handleCloseModal}
            mode={this.state.active}
            tabToPlayer={() => this.changeTab(MODE.PLAYER)}
            tabToCreate={() => this.changeTab(MODE.CREATE)}
          />
          <div className="player-bar" />
          {this.state.active === MODE.PLAYER ? playerBody : createBody}
        </div>
      </Modal>
    );
  }
}

export default connect(
  state => ({
    player: state.player
  }),
  dispatch => ({
    getAlbumRequest: id => dispatch(getAlbum.request(id)),
    getSongRequest: id => dispatch(getSong.request(id)),
    playSong: (videoId, key, listId) => dispatch(play.start(videoId, key, listId)),
    playerModalClose: () => dispatch(playerModal.close())
  })
)(Player);
