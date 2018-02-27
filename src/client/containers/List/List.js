import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import Spinner from 'react-spinkit';
import { getList, getSong, play, listModalClose } from './actions';
import ListItem from './ListItem';
import ListModal from './ListModal';
import './List.scss';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      masonryOptions: {
        itemSelector: '.masonry-item',
        gutter: 20
      }
    };
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.props.getListRequest('', 20);
  }

  openModal(id) {
    this.props.history.push({
      pathname: `/${id}`,
    });
  }

  render() {
    const { list, header, playSong, getSongRequest } = this.props;
    const { songs, isLoading } = list.modal;

    if (header.isLoading) {
      return (
        <section>
          <Spinner name="line-scale-pulse-out-rapid" fadeIn="none" className="list-spinner" />
        </section>);
    }

    if (list.lists.length === 0) {
      return (
        <section>
          <div className="notfound">검색 결과가 없습니다.</div>
        </section>);
    }

    return (
      <section>
        <Masonry className="masonry-container" options={this.state.masonryOptions}>
          {list.lists.map((song, key) => (
            <ListItem
              key={key}
              song={song}
              openModal={this.openModal}
            />))}
        </Masonry>
        <Route path="/:id" component={() => <ListModal />} />
      </section>
    );
  }
}

export default withRouter(connect(
  state => ({
    list: state.list,
    header: state.header
  }),
  dispatch => ({
    getListRequest: (word, num) => dispatch(getList.request(word, num)),
    playSong: (videoId, key, listId) => dispatch(play.start(videoId, key, listId)),
    listModalClose: () => dispatch(listModalClose())
  })
)(List));
