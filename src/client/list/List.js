import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import Spinner from 'react-spinkit';
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
    this.props.getListRequest('', 20);
  }

  getSong(id) {
    console.log(id);
  }

  render() {
    const { list, isLoadingBySearch } = this.props;

    if(isLoadingBySearch) {
      return <section>
        <Spinner name="line-scale-pulse-out-rapid" fadeIn="none" className="spinner"/>
      </section>;
    }

    if(list.songs.length === 0) {
      return <section>
        <div className="notfound">검색 결과가 없습니다.</div>
      </section>;
    }

    return (
      <section>
        <Masonry className="masonry-container" options={this.state.masonryOptions}>
          {list.songs.map((song, key) => <ListItem key={key} song={song} getSong={this.getSong}/>)}
        </Masonry>
      </section>
    );
  }
}

export default connect(
  state => ({
    list: state.listReducer,
    isLoadingBySearch: state.headerReducer.isLoading
  }),
  dispatch => ({
    getListRequest: (word, num) => dispatch(getList.request(word, num))
  })
)(List);
