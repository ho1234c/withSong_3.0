import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/App';

// import { createStore } from 'redux'
// import reducers from './reducers';
// import { Provider } from 'react-redux';

// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && 
//                           window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <App />, document.getElementById('root'),
);
