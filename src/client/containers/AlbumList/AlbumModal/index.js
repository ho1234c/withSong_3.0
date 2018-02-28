import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { getSong } from '../actions';
import AlbumModalHeader from './AlbumModalHeader';
import AlbumModalBody from './AlbumModalBody';
import AlbumModalFooter from './AlbumModalFooter';
import './AlbumModal.scss';

class AlbumModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // album: this.props.location.state.album
    };
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    console.log(this.props);
    // this.props.getSongRequest();
  }


  handlePlay(...params) {
    const { album, playSong } = this.props;

    playSong(...params, album.id);
  }

  render() {
    return (
      <Modal
        isOpen
        shouldCloseOnOverlayClick
        contentLabel="Modal"
        className="song-modal"
        overlayClassName="overlay"
      >
        <div className="album-modal">
        MODAL
          {/* <AlbumModalHeader name={name} createdAt={createdAt} />
          <div className="album-modal-bar" />
          <AlbumModalBody contents={contents} handlePlay={this.handlePlay} />
          <AlbumModalFooter like={like} length={contents.length} />
          <div className="album-modal-comment" /> */}
        </div>
      </Modal>

    );
  }
}

AlbumModal.propTypes = {
  album: PropTypes.object.isRequired,
  playSong: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    selected: state.album.selected,
  }),
  dispatch => ({
    getSongRequest: id => dispatch(getSong.request(id)),
  })
)(AlbumModal);

