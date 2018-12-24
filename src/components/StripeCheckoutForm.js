import React                              from "react";
import "../App.css";
import {injectStripe, CardElement, CardNumberElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from "react-stripe-elements";
import {Button, Modal, Form, Input, Message} from 'semantic-ui-react';
import {css}                               from "emotion";
import PaymentDetails
                                           from "./PaymentDetails";
import {checkoutSteps}                     from "../constants";
import store                               from "../reducer";
import Axios                               from "axios";
import validator from "validator";


class StripeCheckoutForm extends React.Component {
  state = {
    invalidCharactersFirstName : false,
    invalidCharactersLastName : false,
    invalidLengthFirstName : false,
    invalidLengthLastName : false,
    invalidEmail : false,
    bigWidth : false,
    paymentRequestPending : false,
    canNotAdvance : true
  };
  
  
  checkIfReadyToAdvance() {
    if (
      this.props.firstName &&
      this.props.lastName &&
      this.props.emailAddress &&
      this.props.creditCardValueIsThere &&
      this.state.invalidCharactersFirstName === false &&
      this.state.invalidCharactersLastName === false &&
      this.state.invalidLengthFirstName === false &&
      this.state.invalidLengthLastName === false &&
      this.state.invalidEmail === false
    ) {
      this.setState({
        canNotAdvance : false
      });
      console.log("ready");
    } else {
      this.setState({
        canNotAdvance : true // in case all values are falsey again
      });
      console.log("not ready");
    }
  }
  
  
  createStripeToken = event => {
    event.preventDefault();
    this.setState({
      paymentRequestPending : true
    });
    
    this.props.stripe.createToken({
      name : `${this.props.firstName} ${this.props.lastName}`,
      amount : this.props.donationAmount
    })
      .then(result => {
        console.log('Token created: ', result);
  
        if (result.token) {
          console.log('Success! Token: ', result.token);
          console.log("posting token object to the backend...");
          
          // send data to server for a secure charge request
          const dataObject = {
            resultToken  : result.token, // has combined name field
            checkoutStep : this.props.checkoutStep,
            emailAddress : this.props.emailAddress,
            donationAmount : this.props.donationAmount,
            firstName : this.props.firstName,
            lastName : this.props.lastName
          };
          return Axios.post(process.env.REACT_APP_API_POST_URL, dataObject);
    
        } else if (result.error) {
          return console.log('Error: ', result.error);
        }
      })
      // set response flips state to next checkout step
        .then(responseObject => {
          this.setState({
            paymentRequestPending : false // for the loader button
          });
          
          console.log('responseObject in React', responseObject);
          console.log('responseObject.data in React', responseObject.data);
          this.props.dispatchUpdateStateData(responseObject.data.checkoutStep, 'checkoutStep'); // referrals
          this.props.dispatchUpdateStateData(responseObject.data.donorId, 'donorId')
        })
      .catch(e => console.log(e));
  };
  
  concatArray(stateKeyArray) {
    let outputString = '';
    for (let i = 0; i < stateKeyArray.length; i ++) {
      outputString += stateKeyArray[i].concat(" ");
    }
    return outputString;
  }
  
  validateFirstName() {
    if (validator.isAlpha(this.props.firstName) === false && this.props.firstName !== '') {
      const firstNameOnlyLetters = "First Name must contain only letters. ";
      // if the state variable doesn't already contain the target string
        // if regex match equals false
      if (this.state.firstNameValidationWarnings.toString().includes(firstNameOnlyLetters) === false) {
        this.setState({
          firstNameValidationWarnings : this.state.firstNameValidationWarnings.concat([firstNameOnlyLetters])
        })
      }
  } else {
        this.setState({
          firstNameValidationWarnings : this.state.firstNameValidationWarnings.filter(validationString => {
            return validationString !== "First Name must contain only letters. "
        })
      })
    }
  }
  
  // sort by the type of caller. See if the event property fails validation
  // AND has a truthy value (not ''). Flip a boolean state switch on failure
  // flip switch back to true whenever success
  validateInputValue(inputType, stateVariable, inputEvent) {
      let inputTargetValue = inputEvent.target.value;
      console.log('inputTargetValue', inputTargetValue);
      
      if (inputType === 'name') {
        const testForLettersOnly = validator.isAlpha(inputEvent.target.value);
        if (testForLettersOnly === false && inputTargetValue) {
          this.setState({
            [stateVariable] : true
          })
        } else {
          this.setState({
            [stateVariable] : false
          })
        }
      } else if (inputType === 'email') {
        const testForEmail = validator.isEmail(inputEvent.target.value);
        if (testForEmail === false && inputTargetValue) {
          this.setState({
            [stateVariable] : true
          })
        } else {
          this.setState({
            [stateVariable] : false
          })
        }
      }
    }
  
  validateLength(stateVariable, minAndMaxLengthArray, inputEvent) {
    if (inputEvent.target.value.length >= minAndMaxLengthArray[0] &&
      inputEvent.target.value.length <= minAndMaxLengthArray[1]
    ) {
      this.setState({
        [stateVariable] : false
      })
    } else {
      this.setState({
        [stateVariable] : true
      })
    }
  }
  
  componentDidMount() {
    // console.log('donationHiddenInputRef on mount of PaymentDetails.js', this.donationHiddenInputRef.current.value)
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.firstName !== prevProps.firstName ||
      this.props.lastName !== prevProps.lastName ||
      this.props.emailAddress !== prevProps.emailAddress ||
      this.props.creditCardValueIsThere !== prevProps.creditCardValueIsThere ||
      this.state.invalidCharactersFirstName !== prevState.invalidCharactersFirstName ||
      this.state.invalidCharactersLastName !== prevState.invalidCharactersLastName ||
      this.state.invalidLengthFirstName !== prevState.invalidLengthFirstName ||
      this.state.invalidLengthLastName !== prevState.invalidLengthLastName ||
      this.state.invalidEmail !== prevState.invalidEmail
    ) {
      this.checkIfReadyToAdvance();
    }
  }
  
  
  render() {
    return (
      <React.Fragment>
        <Modal.Header className={headerStyle}>Finalize Your Payment</Modal.Header>
        <div id='stripeContainer' className={containerStyle}>
          <Modal.Content>
            <Form onSubmit={this.createStripeToken}>
  
              {/* This area is display:none unless the inputs expand to a single row */}
              {/* ALL Validation Messages*/}
              {this.state.invalidCharactersFirstName && <p className={validationMessageTopStyle}>First Name should only have letters</p>}
              {this.state.invalidLengthFirstName && <p className={validationMessageTopStyle}>First Name must be between 2 to 15 characters long</p>}
              {this.state.invalidCharactersLastName && <p className={validationMessageTopStyle}>Last Name should only have letters</p> }
              {this.state.invalidLengthLastName && <p className={validationMessageTopStyle}>Last Name must be between 2 to 25 characters long</p>}
              {this.state.invalidEmail &&
               <p className={validationMessageTopStyle}>Please enter a valid email address</p>}
  
              <Form.Group widths='equal' className={formGroupStyle}>
                
                {/* First Name Validation Messages*/}
                {this.state.invalidCharactersFirstName && <p className={validationMessageIntertwinedStyle}>First Name should only have letters</p>}
                {this.state.invalidLengthFirstName && <p className={validationMessageIntertwinedStyle}>First Name must be between 2 to 15 characters long</p>}
                
                
                <Form.Input
                  type='text'
                  placeholder='First Name'
                  name='first_name'
                  onChange={e => {
                    e.preventDefault();
                    this.props.dispatchUpdateStateData(e.target.value, 'firstName');
                    this.validateInputValue('name', 'invalidCharactersFirstName', e);
                    console.log('getState', store.getState());
                    console.log('internal state', this.state);
                  }}
                  onBlur={e => {
                    this.validateLength('invalidLengthFirstName', [2, 15], e)
                  }}
                />
                
                {/* error messages */}
                {this.state.invalidCharactersLastName && <p className={validationMessageIntertwinedStyle}>Last Name should only have letters</p> }
                {this.state.invalidLengthLastName && <p className={validationMessageIntertwinedStyle}>Last Name must be between 2 to 25 characters long</p>}
                
                <Form.Input
                  type='text'
                  placeholder='Last Name'
                  name='last_name'
                  onChange={e => {
                    e.preventDefault();
                    this.props.dispatchUpdateStateData(e.target.value, 'lastName');
                    this.validateInputValue('name', 'invalidCharactersLastName', e);
                    console.log('e.target.value', e.target.value);
                    console.log("this.state.invalidCharactersLastName", this.state.invalidCharactersLastName);
                  }}
                  onBlur={e => {
                    this.validateLength('invalidLengthLastName', [2, 25], e)
                  }}
                />
                
                
                {this.state.invalidEmail &&
                 <p className={validationMessageIntertwinedStyle}>Please enter a valid email address</p>}
                
                <Form.Input
                  type='text'
                  placeholder='Email Address'
                  name='email'
                  onChange={e => {
                    e.preventDefault();
                    this.props.dispatchUpdateStateData(e.target.value, 'emailAddress');
                    console.log(store.getState());
                  }}
                  onBlur={e => {
                    this.validateInputValue('email', 'invalidEmail', e);
                  }}
                />
              </Form.Group>
  
              <CardElement
                className={cardElementStyle}
                {...cardOptions}
                onChange={(changeObject) => {
                  this.props.dispatchUpdateStateData(
                    changeObject.complete, 'creditCardValueIsThere');
                    // true if value is there
                  console.log('changeObject', changeObject);
                  console.log('changeObject.complete', changeObject.complete);
  
                }}
              />
        
              <div className={ button_style }>
                <Button
                  primary
                  disabled={this.state.canNotAdvance}
                  loading={this.state.paymentRequestPending}
                >Complete Payment</Button>
              </div>
            </Form>
          </Modal.Content></div>
        
      </React.Fragment>
    )
  }
  
}

export default injectStripe(StripeCheckoutForm);


const headerStyle = css`
  font-size: 1.3em;
  line-height: 1.28571429em;
  font-weight: 700;
  padding-bottom: 20px;
  margin-bottom: 20px;
  padding-left: 22px;
  border-bottom: .7px solid rgba(195,211,215,0.9);
`;

const containerStyle = css`
  padding: 2vh 2vw;
`;

const formGroupStyle = css`
  overflow: hidden;
`;

const button_style = css`
  display: flex;
  justify-content: center;
`;

const cardElementStyle = css`
  border: .2px solid rgba(40, 41, 44, 0.15);
  //border-radius: 3px; // breaks the whole border for some reason
  color: rgba(40, 41, 44, 0.15);
  height: 38px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  &::selection {
    background-color: red !important; // doesn't work
    border: 1px solid rgb(26, 141, 181); // also doesn't work
  }
  &:hover {
    //background-color: red; // works
  }
`;

const validationMessageIntertwinedStyle = css`
  color: #8c0615;
  //border: 3px dotted pink;
  margin-left: 2vw;
  display: block;
  @media (min-width: 770px) {
    display: none;
  }
`;

const validationMessageTopStyle = css`
  color: #8c0615;
  //border: 3px dotted pink;
  margin-left: 2vw;
    display: none;
  @media (min-width: 770px) {
    display: block;
  }
`;

const cardOptions = {
  style : {
    base : {
      border: '1px solid #9e2146 !important', // doesn't work
      // color: '#9e2146', // does work
    }
    // invalid: {}
  }
};





















