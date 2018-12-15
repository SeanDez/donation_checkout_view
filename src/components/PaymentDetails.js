import React from "react";
import {css} from "emotion";
import {Elements} from "react-stripe-elements";
import StripeCheckoutForm from "./StripeCheckoutForm";


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
