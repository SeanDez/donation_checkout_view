import React              from "react";
import {css}              from "emotion";
import {Elements}         from "react-stripe-elements";
import StripeCheckoutForm from "./StripeCheckoutForm";
import {Message}          from "semantic-ui-react";
import {Form}             from "semantic-ui-react/dist/commonjs/collections/Form";


export default class PaymentDetails extends React.Component {

  
  render() {
    return (
      <React.Fragment>
      <Elements>
        <StripeCheckoutForm {...this.props}/>
      </Elements>
      </React.Fragment>
    )
  }
}
