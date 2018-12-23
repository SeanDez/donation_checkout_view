import React                                           from "react";
import {css}                                           from "emotion";
import {Button, Modal, Form, Input, Checkbox, Message} from 'semantic-ui-react';
import store                                           from "../reducer";
import {checkoutSteps}                                 from "../constants";
import NumberFormat from "react-number-format";

export default class SelectDonation extends React.Component {
  
  state = {
    canNotAdvance : true
  };
  
  checkIfReadyToAdvance() {
    if (
      this.props.donationCheckbox10 ||
      this.props.donationCheckbox25 ||
      this.props.donationCheckbox50 ||
      this.props.donationInputField
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
  
  clearTheOtherCheckboxes(amountToPreserve) {
    if (amountToPreserve === 10) {
      this.props.dispatchUpdateStateData(false, 'donationCheckbox25');
      this.props.dispatchUpdateStateData(false, 'donationCheckbox50');
    } else if (amountToPreserve === 25) {
      this.props.dispatchUpdateStateData(false, 'donationCheckbox10');
      this.props.dispatchUpdateStateData(false, 'donationCheckbox50');
    } else if (amountToPreserve === 50) {
      this.props.dispatchUpdateStateData(false, 'donationCheckbox10');
      this.props.dispatchUpdateStateData(false, 'donationCheckbox25');
    }
  }
  
  setDonationAmount() {
    if (this.props.donationInputField) {
      this.props.dispatchUpdateStateData(this.props.donationInputField, 'donationAmount')
    } else if (this.props.donationCheckbox10) {
      this.props.dispatchUpdateStateData(1000, 'donationAmount')
    } else if (this.props.donationCheckbox25) {
      this.props.dispatchUpdateStateData(2500, 'donationAmount')
    } else if (this.props.donationCheckbox50) {
      this.props.dispatchUpdateStateData(5000, 'donationAmount')
    }
    console.log('donationAmount after button click: ', store.getState().donationAmount)
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    // do a comparison
    if (
      prevProps.donationCheckbox10 !== this.props.donationCheckbox10 ||
      prevProps.donationCheckbox25 !== this.props.donationCheckbox25 ||
      prevProps.donationCheckbox50 !== this.props.donationCheckbox50 ||
      prevProps.donationInputField !== this.props.donationInputField
    ) {
      this.checkIfReadyToAdvance();
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <Modal.Header>Choose an amount</Modal.Header>
        <Modal.Content >
          <Form>
            <Form.Group className={field_group_style}>
              <Form.Field
                control={Checkbox}
                checked={this.props.donationCheckbox10}
                label='$10'
                value={1000}
                onChange={() => {
                  this.props.dispatchUpdateStateData('', 'donationInputField');
                  this.props.dispatchUpdateStateData(!this.props.donationCheckbox10, 'donationCheckbox10');
                  this.clearTheOtherCheckboxes(1000);
                  console.log('getState()', store.getState());
                }}
              />
              <Form.Field
                control={Checkbox}
                checked={this.props.donationCheckbox25}
                label='$25'
                value={2500}
                onChange={() => {
                  this.props.dispatchUpdateStateData('', 'donationInputField');
                  this.props.dispatchUpdateStateData(!this.props.donationCheckbox25, 'donationCheckbox25');
                  this.clearTheOtherCheckboxes(2500);
                  console.log('getState()', store.getState());
                }}
              />
              <Form.Field
                control={Checkbox}
                checked={this.props.donationCheckbox50}
                label='$50'
                value={5000}
                onChange={() => {
                  this.props.dispatchUpdateStateData('', 'donationInputField');
                  this.props.dispatchUpdateStateData(!this.props.donationCheckbox50, 'donationCheckbox50');
                  this.clearTheOtherCheckboxes(5000);
                  console.log('getState()', store.getState());
                }}
              />
            </Form.Group>
  
            <div className={wrapperCenterStyle} style={{ margin : '2vh 0' }}>
              <p>OR</p>
            </div>
            
            <div className={wrapperCenterStyle} style={{ margin : '2vh 0' }}>
            {/* Semantic UI's function component was causing this issue */}
            
              <NumberFormat
                style={{marginBottom : '2vh', maxWidth : '250px'}}
                placeholder={'Enter a Custom Amount'}
                onFocus={() => {
                  this.props.dispatchUpdateStateData(false, 'donationCheckbox10');
                  this.props.dispatchUpdateStateData(false, 'donationCheckbox25');
                  this.props.dispatchUpdateStateData(false, 'donationCheckbox50');
                  }
                }
                allowNegative={false}
                thousandSeparator
                prefix={'$'}
                onValueChange={dataValues => {
                  // dataValues.value accesses the raw value
                  const {value} = dataValues; // destruct the matching name into a const
                  this.props.dispatchUpdateStateData(value * 100, 'donationInputField');
                  console.log('getState()', store.getState());
                 }
                }
              />
            </div>
  
            <div className={wrapperCenterStyle}>
              <Button
                disabled={this.state.canNotAdvance}
                primary
                onClick={(event) => {
                  event.preventDefault();
                  this.setDonationAmount();
                  this.props.dispatchChangeCheckoutStep(checkoutSteps.paymentDetails);
                  console.log(store.getState().checkoutStep)
                }}>Next Step
              </Button>
            </div>


          </Form>
        </Modal.Content>
      </React.Fragment>
    )
  }
}

const field_group_style = css`
  margin-left: auto !important;
  margin-right: auto !important;
  //width: 50vw !important;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  max-width: 200px;
  line-height: 5vh;
  //border: 3px dotted pink;
`;

const centerStyle = css`
  text-align: center;
  margin-left : auto !important;
  margin-right : auto !important;
  //padding-left: auto !important;
  //padding-right: auto !important;
  border: 3px dotted lightseagreen;
`;

const wrapperCenterStyle = css`
  display: flex;
  justify-content: center;
`;