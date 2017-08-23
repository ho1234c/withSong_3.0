import* as React from'react';
import{ createStore, applyMiddleware } from'redux';
import{ Provider } from'react-redux';
import createSagaMiddleware from'redux-saga';
import rootSaga from'./sagas';
import List from'../List/List';
import reducer from'./reducers';
import Header from'../Header/Header';
import'./App.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

class App extends React.Component {
  render() {
    return(
      <Provider store={ store }>
        <div id="container">
          <Header />
          <List />
        </div>
      </Provider>
    );
  }
}

export default App;
