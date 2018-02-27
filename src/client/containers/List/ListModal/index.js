import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { getSong } from '../actions';
import ListModalHeader from './ListModalHeader';
import ListModalBody from './ListModalBody';
import ListModalFooter from './ListModalFooter';
import './ListModal.scss';

class ListModal extends Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    // this.props.getSongRequest();
  }


  handlePlay(...params) {
    const { list, playSong } = this.props;

    playSong(...params, list.id);
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
        <div className="list-modal">
        MODAL
          {/* <ListModalHeader name={name} createdAt={createdAt} />
          <div className="list-modal-bar" />
          <ListModalBody songInfo={songInfo} handlePlay={this.handlePlay} />
          <ListModalFooter like={like} length={songInfo.length} />
          <div className="list-modal-comment" /> */}
        </div>
      </Modal>

    );
  }
}

ListModal.propTypes = {
  list: PropTypes.object.isRequired,
  playSong: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    modal: state.list.modal,
  }),
  dispatch => ({
    getSongRequest: id => dispatch(getSong.request(id)),
  })
)(ListModal);

