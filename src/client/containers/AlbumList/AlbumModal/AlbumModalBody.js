import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlbumModalBodyItem from './AlbumModalBodyItem';

class AlbumModalBody extends Component {
  render() {
    const { contents, handlePlay } = this.props;
    const components = contents.map((song, key) =>
      <AlbumModalBodyItem key={key} song={song} handlePlay={handlePlay} />);

    return (
      <div className="album-modal-body">
        {components}
      </div>
    );
  }
}

AlbumModalBody.propTypes = {
  contents: PropTypes.array.isRequired,
  handlePlay: PropTypes.func.isRequired
};

export default AlbumModalBody;
