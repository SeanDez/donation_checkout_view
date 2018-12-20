import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import ReactRedux from "react-redux";
import ReduxThunk from "redux-thunk";

const starting_state = {
  log_to_console : 0,
  checkoutStep : 'selectDonation',
  firstName : '',
  lastName : '',
  emailAddress : '',
  donationInputField : null
};

const reducer = (previous_state = starting_state, action) => {
  switch (action.type) {
    case 'logToConsole':
      return {
        ...previous_state,
        log_to_console : previous_state.log_to_console + 1
      };
    case 'setDonationAmount':
      return {
        ...previous_state,
        donation_amount: action.payload.donationAmount
      };
    case 'setCheckoutStep':
      return {
        ...previous_state,
        checkoutStep : action.payload.checkoutStep
      };
    case 'stateUpdate':
      return {
        ...previous_state,
        [action.payload.stateVariable] : action.payload.stateData
      };
    case 'thunkTest':
      return {
        ...previous_state,
        redux_thunk_test_var : action.payload
      };
    case 'quoteThunk':
      return {
        ...previous_state,
        quote_thunk : action.payload.data[0].content
      };
    default:
      return previous_state;
  }
};

export default createStore(reducer, starting_state, applyMiddleware(ReduxThunk));

