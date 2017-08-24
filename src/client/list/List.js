import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bricks from 'bricks.js';
import ListItem from './ListItem';
import { getList } from './ListActions';
import './List.css';

class Lists extends Component {
  componentDidMount() {
    const sizes = [
      { columns: 2, gutter: 10 },
      { mq: '768px', columns: 3, gutter: 25 },
      { mq: '1024px', columns: 4, gutter: 40 }
    ];

    const instance = Bricks({
      container: '#listContainer',
      packed: 'data-packed',
      sizes
    });

    instance.resize(true).pack();
    console.log(this.props.getListRequest('test', 3));
  }

  render() {
    const fakeData = Array(20).fill('test');
    const fakeBox = fakeData.map((data, key) => ({
      backgroundColor: 'gray',
      width: '300px',
      height: `${((Math.random() * 200) + 200)}px`
    }));

    return(
      <section>
        <div id="listContainer">
          { fakeData.map((data, key) => <div key={key} style={fakeBox[key]}><ListItem /></div>) }
        </div>
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
)(Lists);
