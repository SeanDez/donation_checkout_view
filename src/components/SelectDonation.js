import React                               from "react";
import {css}                               from "emotion";
import {Button, Modal, Form, Input, Checkbox} from 'semantic-ui-react';
import store                               from "../reducer";
import {checkoutSteps}                     from "../constants";


export default class SelectDonation extends React.Component {
  constructor(props) {
    super(props);
    this.customDonationInputRef = React.createRef();
  }
  
  
  
  handleInputChange = inputEvent => {
    this.props.dispatch_set_donation_amount(inputEvent.target.value)
      .then(propValue => console.log("mapStateToProps value: ", propValue));
    // console.log(inputEvent.target.value);
    console.log("getState value", store.getState());
    
  };
  
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
      this.props.dispatchUpdateStateData(10, 'donationAmount')
    } else if (this.props.donationCheckbox25) {
      this.props.dispatchUpdateStateData(25, 'donationAmount')
    } else if (this.props.donationCheckbox50) {
      this.props.dispatchUpdateStateData(50, 'donationAmount')
    }
    console.log('donationAmount after button click: ', store.getState().donationAmount)
  }
  
  render() {
    return (
      <React.Fragment>
        {console.log('starting state onload', store.getState())}
        <Modal.Header>Choose an amount</Modal.Header>
        <Modal.Content >
          <Form>
            <Form.Group className={field_group_style}>
              <Form.Field
                control={Checkbox}
                checked={this.props.donationCheckbox10}
                label='$10'
                value={10}
                onChange={() => {
                  this.props.dispatchUpdateStateData('', 'donationInputField');
                  this.props.dispatchUpdateStateData(!this.props.donationCheckbox10, 'donationCheckbox10');
                  console.log(store.getState());
                  this.clearTheOtherCheckboxes(10);
                }}
              />
              <Form.Field
                control={Checkbox}
                checked={this.props.donationCheckbox25}
                label='$25'
                value={25}
                onChange={() => {
                  this.props.dispatchUpdateStateData('', 'donationInputField');
                  this.props.dispatchUpdateStateData(!this.props.donationCheckbox25, 'donationCheckbox25');
                  this.clearTheOtherCheckboxes(25);
                  console.log(store.getState())
                }}
              />
              <Form.Field
                control={Checkbox}
                checked={this.props.donationCheckbox50}
                label='$50'
                value={50}
                onChange={() => {
                  this.props.dispatchUpdateStateData('', 'donationInputField');
                  this.props.dispatchUpdateStateData(!this.props.donationCheckbox50, 'donationCheckbox50');
                  this.clearTheOtherCheckboxes(50);
                  console.log(store.getState())
                }}
              />
            </Form.Group>
  
            <div className={wrapperCenterStyle} style={{ margin : '2vh 0' }}>
              <p>OR</p>
            </div>
            
            <div className={wrapperCenterStyle} style={{ margin : '2vh 0' }}>
            {/* Semantic UI's function component was causing this issue */}
              <input
                type='number'
                placeholder='Custom Amount'
                value={this.props.donationInputField}
                // value={store.donation_amount}
                // defaultValue={store.donation_amount}
                style={{marginBottom : '2vh'}}
                onFocus={() => {
                  this.props.dispatchUpdateStateData(false, 'donationCheckbox10');
                  this.props.dispatchUpdateStateData(false, 'donationCheckbox25');
                  this.props.dispatchUpdateStateData(false, 'donationCheckbox50');
                  }
                }
                onChange={
                  e => {
                    this.props.dispatchUpdateStateData(e.target.value, 'donationInputField');
                    console.log(store.getState());
                  }}
              />
            </div>
  
            <div className={wrapperCenterStyle}>
              <Button
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