import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListModalHeader from './ListModalHeader';
import ListModalBody from './ListModalBody';
import ListModalFooter from './ListModalFooter';
import './ListModal.scss';

class ListModal extends Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay(...params) {
    const { list, playSong } = this.props;

    playSong(...params, list.id);
  }

  render() {
    const {
      name, createdAt, like, songInfo
    } = this.props.list;
    const { handleCloseModal } = this.props;

    return (
      <div className="list-modal">
        <ListModalHeader name={name} createdAt={createdAt} handleCloseModal={handleCloseModal} />
        <div className="list-modal-bar" />
        <ListModalBody songInfo={songInfo} handlePlay={this.handlePlay} />
        <ListModalFooter like={like} length={songInfo.length} />
        <div className="list-modal-comment" />
      </div>
    );
  }
}

ListModal.propTypes = {
  list: PropTypes.object.isRequired,
  playSong: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired
};

export default ListModal;
