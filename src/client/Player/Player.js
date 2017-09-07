import React, { Component } from 'react';
import Modal from 'react-modal';

class Player extends Component {
  render() {
    return (
      <Modal isOpen={this.state.modalIsOpen}
          shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleCloseModal}
          contentLabel="Modal"
          className="song-modal"
          overlayClassName="overlay">
          {modalContent}
        </Modal>
    );
  }
}

export default connect(
  state => ({
    listModal: state.header.listModal,
  }),
  dispatch => ({
    getSongRequest: id => dispatch(getSong.request(id)),
    playSong: (videoId, key, listId) => dispatch(play.start(videoId, key, listId))
  })
)(Player);