import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux/store/configureStore';
import cookies from 'browser-cookies'
import {createBrowserHistory} from 'history';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Router, Route, Link } from 'react-router-dom'

import './App.css'
import Oscillator from "./modules/oscillator/Oscillator"
const store = configureStore();
export const history = createBrowserHistory();

syncHistoryWithStore(history, store);

// if (cookies.get('id')) {
//   history.push('#/party')
// }


class App extends Component {
	render() {
		return (
      <div styleName="container">
        <Provider store={store}>
         <div styleName="modules">
           <div styleName="module">
             <Oscillator />
           </div>
          </div>
        </Provider>
      </div>
		);
	}
}



export default App;
