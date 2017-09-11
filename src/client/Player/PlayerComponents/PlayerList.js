import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerListItem from './PlayerListItem';

class PlayerList extends Component {
  render() {
    const { lists, getSong } = this.props;
    const components = lists.map((list, key) =>
      <PlayerListItem key={key} list={list} getSong={getSong} />);

    return (
      <div className="player-list">
        {components}
      </div>
    );
  }
}

PlayerList.propTypes = {
  lists: PropTypes.array,
  getSong: PropTypes.func
};

export default PlayerList;
