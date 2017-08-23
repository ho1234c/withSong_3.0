import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bricks from 'bricks.js';
import ListItem from './ListItem';
import { getList } from './ListActions';
import { getLists } from './ListReducer';
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
    console.log(this.props.getListRequest(3));
  }

  render() {
    const fakeData = Array(20).fill('test');
    const fakeBox = fakeData.map((data, key) => ({
      backgroundColor: 'gray',
      width: '300px',
      height: `${((Math.random() * 200) + 200)}px`
    }));

    return (
      <div id="listContainer">
        {fakeData.map((data, key) => <div key={key} style={fakeBox[key]}><ListItem /></div>)}
      </div>
    );
  }
}

export default connect(
  state => ({
    lists: getLists(state)
  }),
  dispatch => ({
    getListRequest: payload => dispatch(getList.request(payload))
  })
)(Lists);
