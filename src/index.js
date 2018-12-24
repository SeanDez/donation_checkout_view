import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppWrapped} from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from "react-redux";
import store from './reducer';

import {StripeProvider} from "react-stripe-elements";

require("dotenv").load();

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey={process.env.REACT_APP_STRIPE_TEST_PUBLIC_KEY}>
      <AppWrapped />
    </StripeProvider>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
