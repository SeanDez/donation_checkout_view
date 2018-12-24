import React, { Component } from 'react';
import './App.css';

import SelectDonation from './components/SelectDonation';
import PaymentDetails from "./components/PaymentDetails";
import Referrals from "./components/Referrals";
import ArticlesList from './components/ArticlesList';

import {connect}                                          from "react-redux";

import './semantic/dist/semantic.min.css';
import {Modal, Header, Button, Form, Transition, Message} from "semantic-ui-react";

import Redux from "redux";
import ReactRedux from "react-redux";
import axios from "axios";
import {changeCheckoutStep, log_to_console_function, set_donation_amount, updateStateData, testThunk, quoteThunk, postNewDonor} from "./actions";
import store from "./reducer";
import {checkoutSteps} from "./constants";
import dotenv from 'dotenv';


// const dotEnvOptions = {
//   path: '.env',
//   debug: true
// };
// const dotenvSetup = dotenv.config(dotEnvOptions);

const googleEnvVariable = process.env.REACT_APP_GOOGLE || 'nothing found';


/// App component
class App extends Component {
  
  coldStartTheBackEnd() {
    console.log("cold start function running");
    return axios.post(process.env.REACT_APP_API_POST_URL, {
        coldStart : true
      })
          .then(response => console.log(response.data.message))
        .catch(e => console.log(e));
  }
  
  componentDidMount() {
    // check if dotenv had an error
    // if (dotenv.error) {
    //   console.log('dotenv.error', dotenv.error);
    // } else { console.log('dotenv.parsed', dotenv.parsed);
    
    
    
    /* wake up the hibernating back-end */
    this.coldStartTheBackEnd();
  }
  
  render() {
    return (
      <div className="App">
  
        <header className="App-header">
  
          <div><p>{googleEnvVariable}</p></div>
          
          <Modal
            trigger={<Button color='purple'>Donate</Button>}
            size='small'
          >
          
          {/* For quick testing only */}
          {/*<SelectDonation {...this.props} />*/}
          {/*<PaymentDetails {...this.props} />*/}
          {/*<Referrals {...this.props} />*/}
          {/*<ArticlesList {...this.props} />*/}
          
          {this.props.checkoutStep === checkoutSteps.selectDonation &&
           <SelectDonation
            dispatch_set_donation_amount = {this.props.dispatch_set_donation_amount}
            dispatchChangeCheckoutStep={this.props.dispatchChangeCheckoutStep}
             {...this.props} /> }
          {this.props.checkoutStep === checkoutSteps.paymentDetails &&
            <PaymentDetails {...this.props} /> }
          {this.props.checkoutStep === checkoutSteps.referrals && <Referrals {...this.props} />}
          {this.props.checkoutStep === checkoutSteps.articlesList && <ArticlesList />}
          
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
    referral2EmailAddress : state.referral2EmailAddress,
    donationCheckbox10 : state.donationCheckbox10,
    donationCheckbox25 : state.donationCheckbox25,
    donationCheckbox50 : state.donationCheckbox50,
    donationInputField : state.donationInputField,
    creditCardValueIsThere : state.creditCardValueIsThere
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
