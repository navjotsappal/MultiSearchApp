import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './main.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './Components/Reducers'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

ReactDOM.render(
  <Provider store = {store}>
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
  </Provider>    
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
