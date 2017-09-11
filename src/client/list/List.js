import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import Spinner from 'react-spinkit';
import Modal from 'react-modal';
import { getList, getSong, play } from './ListActions';
import ListItem from './ListItem';
import ListModal from './ListModal';
import './List.css';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      masonryOptions: {
        itemSelector: '.masonry-item',
        gutter: 20
      },
      modalIsOpen: false
    };

    this.getSong = this.getSong.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.props.getListRequest('', 20);
  }

  getSong(id) {
    this.setState({
      ...this.state,
      modalIsOpen: true
    });

    this.props.getSongRequest(id);
  }

  handleCloseModal() {
    this.setState({
      ...this.state,
      modalIsOpen: false
    });
  }

  render() {
    const { list, isLoadingBySearch, playSong } = this.props;
    const { songs } = list.modal;

    if(isLoadingBySearch) {
      return <section>
        <Spinner name="line-scale-pulse-out-rapid" fadeIn="none" className="list-spinner" />
      </section>;
    }

    if(list.lists.length === 0) {
      return <section>
        <div className="notfound">검색 결과가 없습니다.</div>
      </section>;
    }

    const modalContent = (list.modal.isLoading || list.modal.songs.length === 0) ?
      <Spinner name="line-scale-pulse-out-rapid" fadeIn="none" className="modal-spinner"/> :
      <ListModal list={songs} handleCloseModal={this.handleCloseModal} playSong={playSong}/>;

    return (
      <section>
        <Masonry className="masonry-container" options={this.state.masonryOptions}>
          {list.lists.map((song, key) => <ListItem key={key}
            song={song} getSong={this.getSong} handleCloseModal={this.handleCloseModal}/>)}
        </Masonry>
        <Modal isOpen={this.state.modalIsOpen} shouldCloseOnOverlayClick={true}
          onRequestClose={this.handleCloseModal} contentLabel="Modal"
          className="song-modal" overlayClassName="overlay">
          {modalContent}
        </Modal>
      </section>
    );
  }
}

export default connect(
  state => ({
    list: state.list,
    isLoadingBySearch: state.header.isLoading
  }),
  dispatch => ({
    getListRequest: (word, num) => dispatch(getList.request(word, num)),
    getSongRequest: id => dispatch(getSong.request(id)),
    playSong: (videoId, key, listId) => dispatch(play.start(videoId, key, listId))
  })
)(List);
