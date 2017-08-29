import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import ListItem from './ListItem';
import { getList } from './ListActions';
import './List.css';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      masonryOptions: {
        itemSelector: '.masonry-item',
        gutter: 20
      }
    };
  }

  componentDidMount() {
    this.props.getListRequest('test', 3);
  }

  render() {
    const { list } = this.props;
    // const isEmpty = list.songs.length === 0;

    return (
      <section>
        <Masonry className="masonry-container" options={this.state.masonryOptions}>
          {list.songs.map((song, key) => <ListItem key={key} song={song}/>)}
        </Masonry>
      </section>
    );
  }
}

export default connect(
  state => ({
    list: state.listReducer
  }),
  dispatch => ({
    getListRequest: (word, num) => dispatch(getList.request(word, num))
  })
)(List);
