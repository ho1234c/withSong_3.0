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
    this.props.getListRequest('');
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
    const { isOpen, lists, song } = this.props.player;
    const { MODE } = this;
    const playerBody =
    <div className="player-body-container">
      <div className="player-body-left"><List lists={lists} getSong={this.getSong}/></div>
      <div className="player-body-right"><Song songs={song.songs} playSong={playSong}/></div>
    </div>;
    const createBody = <div className='create-body-container'></div>;
    // <Spinner name="line-scale-pulse-out-rapid" fadeIn="none" className="modal-spinner"/>;

    return (
      <Modal isOpen={isOpen} shouldCloseOnOverlayClick={true} onRequestClose={this.handleCloseModal}
        contentLabel="Modal" className="player-modal" overlayClassName="overlay">
        <div className="player">
          <Header handleCloseModal={this.handleCloseModal} mode={this.state.active}
            tabToPlayer={() => this.changeTab(MODE.PLAYER)}
            tabToCreate={() => this.changeTab(MODE.CREATE)}/>
          <div className="player-bar"></div>
          {this.state.active === MODE.PLAYER ? playerBody : createBody}
        </div>;
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
    playSong: (videoId, key, listId) => dispatch(play.start(videoId, key, listId)),
    playerModalClose: () => dispatch(playerModal.close())
  })
)(Player);
