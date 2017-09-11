import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListModalBodyItem from './ListModalBodyItem';

class ListModalBody extends Component {
  render() {
    const { songInfo, handlePlay } = this.props;
    const components = songInfo.map((song, key) =>
      <ListModalBodyItem key={key} song={song} handlePlay={handlePlay} />);

    return (
      <div className="list-modal-body">
        {components}
      </div>
    );
  }
}

ListModalBody.propTypes = {
  songInfo: PropTypes.array,
  handlePlay: PropTypes.func
};

export default ListModalBody;
