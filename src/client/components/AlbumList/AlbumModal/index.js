import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Spinner from 'react-spinkit';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import moment from 'moment';
import { getSong, play } from '../actions';
import AlbumModalSong from './AlbumModalSong';
import './AlbumModal.scss';

class AlbumModal extends Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getSongRequest(id);
  }


  handlePlay(...params) {
    const { selected, playStart } = this.props;

    playStart(...params, selected.album.id);
  }

  closeModal() {
    this.props.history.goBack();
  }

  render() {
    const { selected } = this.props;
    const { name, createdAt, contents = [], like } = selected.album;
    const LoadingComponent = <Spinner name="line-scale-pulse-out-rapid" fadeIn="none" className="modal-spinner" />;

    const ModalComponent = (
      <div className="album-modal">
        <div className="album-modal-header">
          <div className="album-modal-header-name">{name}</div>
          <div className="album-modal-header-created">{moment(createdAt).format('ll')}</div>
          <div className="album-modal-header-close" onClick={this.closeModal}>
            <i className="fa fa-times" aria-hidden="true" />
          </div>
        </div>
        <div className="album-modal-body">
          {contents.map((song, key) => <AlbumModalSong key={key} song={song} handlePlay={this.handlePlay} />)}
        </div>
        <div className="album-modal-footer">
          <div className="album-modal-footer-length">{contents.length}곡</div>
          <div className="album-modal-footer-like">{like}명이 좋아합니다</div>
          <div className="album-modal-footer-favorite">
            <i className="fa fa-heart-o" aria-hidden="true" />ADD TO LIST
          </div>
        </div>
        <div className="album-modal-comment" />
      </div>
    );

    return (
      <Modal
        isOpen
        shouldCloseOnOverlayClick
        onRequestClose={this.closeModal}
        ariaHideApp={false}
        contentLabel="Modal"
        className="song-modal"
        overlayClassName="overlay"
      >
        {(selected.isLoading || contents.length === 0) ? LoadingComponent : ModalComponent}
      </Modal>

    );
  }
}

// AlbumModal.propTypes = {
//   album: PropTypes.object.isRequired,
//   playSong: PropTypes.func.isRequired,
// };

export default withRouter(connect(
  state => ({
    selected: state.album.selected,
  }),
  dispatch => ({
    getSongRequest: id => dispatch(getSong.request(id)),
    playStart: (videoId, key, albumId) => dispatch(play.start(videoId, key, albumId))
  })
)(AlbumModal));

