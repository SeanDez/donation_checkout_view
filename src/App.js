import React, { Component } from 'react';
import './App.css';

import SelectDonation from './components/SelectDonation';
import PaymentDetails from "./components/PaymentDetails";
import Referrals from "./components/Referrals";
import ArticlesList from './components/ArticlesList';

import {connect} from "react-redux";

import './semantic/dist/semantic.min.css';
import {Modal, Header, Button, Form, Transition} from "semantic-ui-react";

import Redux from "redux";
import ReactRedux from "react-redux";
import {changeCheckoutStep, log_to_console_function, set_donation_amount, updateStateData, testThunk, quoteThunk, postNewDonor} from "./actions";
import store from "./reducer";
import {checkoutSteps} from "./constants";
require('dotenv').load();


/// App component
class App extends Component {
  
  state = {
    testToggle : false
  };
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          
          {console.log('store.checkoutStep', this.props.checkoutStep)}
          {console.log('store', store)}
          
          <Transition
            visible={this.props.checkoutStep === 'paymentDetails'}
            // animation='scale'
            duration={3000}
          >
            <h2>This text will be the transition target</h2>
          </Transition>
          
          <button
            onClick={e => {
              this.setState({ testToggle : !this.state.testToggle })
            }}
          >{this.state.testToggle ? 'Turn Off Again' : 'Turn On Again'}</button>
          
          <Modal
            trigger={<Button color='purple'>Donate</Button>}
            size='small'
          >
          
          <SelectDonation {...this.props} />
          <PaymentDetails {...this.props} />
          <Referrals {...this.props} />
          <ArticlesList {...this.props} />
          
          
          {/*{this.props.checkoutStep === checkoutSteps.selectDonation &&*/}
           {/*<SelectDonation*/}
            {/*dispatch_set_donation_amount = {this.props.dispatch_set_donation_amount}*/}
            {/*dispatchChangeCheckoutStep={this.props.dispatchChangeCheckoutStep}*/}
             {/*{...this.props} />*/}
           {/*}*/}
           {/**/}
          {/*{this.props.checkoutStep === checkoutSteps.paymentDetails &&*/}
           {/*<Transition visible={this.props.checkoutStep === 'paymentDetails'} animation='scale' duration={8000}>*/}
            {/*<PaymentDetails {...this.props} />*/}
           {/*</Transition>*/}
             {/*}*/}
          
          {/*{this.props.checkoutStep === checkoutSteps.referrals && <Referrals {...this.props} />}*/}
          
            {/*{this.props.checkoutStep === checkoutSteps.articlesList && <ArticlesList />}*/}
          
          </Modal>
        </header>
      </div>
    );
  }
}


const map_state_to_props = (state) => {
  return {
    log_prop : state.log_to_console,
    donationAmount : state.donationAmount,
    checkoutStep : state.checkoutStep,
    firstName : state.firstName,
    lastName : state.lastName,
    emailAddress : state.emailAddress,
    referral1FirstName : state.referral1FirstName,
    referral2FirstName : state.referral2FirstName,
    referral1EmailAddress : state.referral1EmailAddress,
    referral2EmailAddress : state.referral2EmailAddress
  }
};

const map_dispatch_to_props = (dispatch, own_props) => {
  return {
    dispatch_set_donation_amount : amount => dispatch(set_donation_amount(amount)),
    dispatchChangeCheckoutStep : newStep => dispatch(changeCheckoutStep(newStep)),
    dispatchUpdateStateData : (stateData, stateVariable) => (dispatch(updateStateData(stateData, stateVariable))),
    testThunk : () => dispatch(testThunk()),
    quoteThunk : () => dispatch(quoteThunk()),
    dispatchPostNewDonor : () => (dispatch(postNewDonor()))
  }
};


//connecting redux
export const AppWrapped = connect(map_state_to_props, map_dispatch_to_props)(App);
