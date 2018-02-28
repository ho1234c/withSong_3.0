import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import Spinner from 'react-spinkit';
import { getAlbum, getSong, play } from './actions';
import Album from './Album';
import AlbumModal from './AlbumModal';
import './AlbumList.scss';

class AlbumList extends Component {
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
    this.props.getAlbumRequest('', 20);
  }

  openModal(album) {
    this.props.history.push({
      pathname: `/${album.id}`,
      state: album
    });
  }

  render() {
    const { album, header, playSong, getSongRequest } = this.props;
    const { contents, isLoading } = album.selected;

    if (header.isLoading) {
      return (
        <section>
          <Spinner name="line-scale-pulse-out-rapid" fadeIn="none" className="list-spinner" />
        </section>);
    }

    if (album.list.length === 0) {
      return (
        <section>
          <div className="notfound">검색 결과가 없습니다.</div>
        </section>);
    }

    return (
      <section>
        <Masonry className="masonry-container" options={this.state.masonryOptions}>
          {album.list.map((e, key) => (
            <Album
              key={key}
              album={e}
              openModal={this.openModal}
            />))}
        </Masonry>
        <Route path="/:id" component={() => <AlbumModal />} />
      </section>
    );
  }
}

export default withRouter(connect(
  state => ({
    album: state.album,
    header: state.header
  }),
  dispatch => ({
    getAlbumRequest: (word, num) => dispatch(getAlbum.request(word, num)),
    playSong: (videoId, key, albumId) => dispatch(play.start(videoId, key, albumId)),
  })
)(AlbumList));
