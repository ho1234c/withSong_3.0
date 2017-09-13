import * as React from 'react';
import { Provider } from 'react-redux';
import List from '../List/List';
import Header from '../Header/Header';
import Player from '../Player/Player';
import Video from '../Video/Video';
import Auth from '../Auth/Auth';
import store from './store';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <div id="container">
          <Header />
          <List />
          <Player />
          <Video />
          <Auth />
        </div>
      </Provider>
    );
  }
}

export default App;
