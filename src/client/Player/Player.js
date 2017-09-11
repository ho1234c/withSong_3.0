import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
// import Spinner from 'react-spinkit';
import { getSong, playerModal, getList, play } from './PlayerActions';
import Header from './PlayerComponents/PlayerHeader';
import List from './PlayerComponents/PlayerList';
import Song from './PlayerComponents/PlayerSong';
import './Player.css';

class Player extends Component {
  constructor(props) {
    super(props);

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.getSong = this.getSong.bind(this);
  }

  componentDidMount() {
    this.props.getListRequest('');
  }

  handleCloseModal() {
    this.props.playerModalClose();
  }

  getSong(id) {
    this.props.getSongRequest(id);
  }

  render() {
    const { playSong } = this.props;
    const { isOpen, lists, song } = this.props.player;
    const modalContent =
    <div className="player">
      <Header handleCloseModal={this.handleCloseModal} />
      <div className="player-body-container">
        <div className="player-body-left"><List lists={lists} getSong={this.getSong}/></div>
        <div className="player-body-right"><Song songs={song.songs} playSong={playSong}/></div>
      </div>
    </div>;
    // <Spinner name="line-scale-pulse-out-rapid" fadeIn="none" className="modal-spinner"/>;

    return (
      <Modal isOpen={isOpen} shouldCloseOnOverlayClick={true} onRequestClose={this.handleCloseModal}
        contentLabel="Modal" className="player-modal" overlayClassName="overlay">
        {modalContent}
      </Modal>
    );
  }
}

export default connect(
  state => ({
    player: state.player
  }),
  dispatch => ({
    getListRequest: id => dispatch(getList.request(id)),
    getSongRequest: id => dispatch(getSong.request(id)),
    playSong: (videoId, key) => dispatch(play.start(videoId, key)),
    playerModalClose: () => dispatch(playerModal.close())
  })
)(Player);
