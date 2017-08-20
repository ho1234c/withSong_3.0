import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import List from '../list/List';
import reducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <div>
          <List />
        </div>
      </Provider>
    );
  }
}

export default App;
