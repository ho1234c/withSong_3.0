import React, { Component } from 'react';
import { connect } from 'react-redux';
import ListItem from './ListItem';
import { getList } from './ListActions';
import { getLists } from './ListReducer';

class Lists extends Component {
  componentDidMount() {
    console.log(this.props.getListRequest(3));
  }

  render() {
    return (
      <div>
        <ListItem />
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
