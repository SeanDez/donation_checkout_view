import React                                                                                                          from "react";
import {injectStripe, CardElement, CardNumberElement, CardCVCElement, PostalCodeElement, PaymentRequestButtonElement} from "react-stripe-elements";
import {Button, Modal, Form, Input, Radio} from 'semantic-ui-react';
import {css}                               from "emotion";
import PaymentDetails
                                           from "./PaymentDetails";
import {checkoutSteps}                     from "../constants";
import store                               from "../reducer";
import Axios                               from "axios";

class StripeCheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    
    this.donationHiddenInputRef = React.createRef();
  }
  
  createStripeToken = event => {
    event.preventDefault();
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
          return Axios.post('http://localhost:4000/api/donate', dataObject);
    
        } else if (result.error) {
          return console.log('Error: ', result.error);
        }
      })
      // set response flips state to next checkout step
        .then(responseObject => {
          console.log('responseObject in React', responseObject);
          console.log('responseObject.data in React', responseObject.data);
          this.props.dispatchUpdateStateData(responseObject.data.checkoutStep, 'checkoutStep');
          this.props.dispatchUpdateStateData(responseObject.data.donorId, 'donorId')
        })
      .catch(e => console.log(e));
  };
  
  
  componentDidMount() {
    // console.log('donationHiddenInputRef on mount of PaymentDetails.js', this.donationHiddenInputRef.current.value)
  }
  
  
  render() {
    return (
      <React.Fragment>
        <Modal.Header className={headerStyle}>Finalize Your Payment</Modal.Header>
        <div id='stripeContainer' className={containerStyle}>
          <Modal.Content>
            <Form onSubmit={this.createStripeToken}>
        
              <Form.Group widths='equal' className={formGroupStyle}>
                <Form.Input
                  type='text'
                  placeholder='First Name'
                  name='first_name'
                  onChange={e => {
                    e.preventDefault();
                    this.props.dispatchUpdateStateData(e.target.value, 'firstName');
                    console.log(store.getState());
                  }}
                />
                <Form.Input
                  type='text'
                  placeholder='Last Name'
                  name='last_name'
                  onChange={e => {
                    e.preventDefault();
                    this.props.dispatchUpdateStateData(e.target.value, 'lastName');
                    console.log(store.getState());
                  }}
                />
                <Form.Input
                  type='text'
                  placeholder='Email Address'
                  name='email'
                  onChange={e => {
                    e.preventDefault();
                    this.props.dispatchUpdateStateData(e.target.value, 'emailAddress');
                    console.log(store.getState());
                  }}
                />
              </Form.Group>
  
              <CardElement className={cardElementStyle} />
        
              <div className={ button_style }>
                <Button primary>Complete Payment</Button>
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
  border: .2px solid rgba(120,144,149,0.41);
  color: rgba(120,144,149,0.41);
  height: 35px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  :focus {
    //color: green;
    //border: 1px solid rgb(26, 141, 181); // not working for some reason
  }
`;























