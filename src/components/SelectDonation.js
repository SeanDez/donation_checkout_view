import React                               from "react";
import {css}                               from "emotion";
import {Button, Modal, Form, Input, Radio} from 'semantic-ui-react';
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
  
  
  
  render() {
    return (
      <React.Fragment>
        {console.log('starting state onload', store.getState())}
        <Modal.Header>Choose an amount</Modal.Header>
        <Modal.Content >
          <Form>
            <Form.Group className={field_group_style}>
              <Form.Field
                control={Radio}
                label='$10'
                value={10}
                name='donation_amount'
                onChange={() => {
                  this.props.dispatchUpdateStateData('', 'customTextDonationAmount');
                  this.props.dispatchUpdateStateData('10', 'radioDonationAmount');
                  console.log(store.getState())
                }}
              />
              <Form.Field
                control={Radio}
                label='$25'
                value={25}
                name='donation_amount'
                onChange={() => {
                  this.props.dispatchUpdateStateData('', 'customTextDonationAmount');
                  this.props.dispatchUpdateStateData('25', 'radioDonationAmount');
                  console.log(store.getState())
                }}
              />
              <Form.Field
                control={Radio}
                label='$50'
                value={50}
                name='donation_amount'
                onChange={() => {
                  this.props.dispatchUpdateStateData('', 'customTextDonationAmount');
                  this.props.dispatchUpdateStateData('50', 'radioDonationAmount');
                  console.log(store.getState())
                }}
              />
            
              <p style={{ marginLeft : "2vw" }}>OR</p>
            
              {/* Semantic UI's function component was causing this issue */}
              <input
                type='number'
                placeholder='Custom Amount'
                name='donation_amount'
                id='custom_amount'
                ref={this.customDonationInputRef}
                // value={store.donation_amount}
                // defaultValue={store.donation_amount}
                style={{marginBottom : '2vh'}}
                onChange={
                  e => {
                    this.props.dispatchUpdateStateData('', 'radioDonationAmount');
                    this.props.dispatchUpdateStateData(e.target.value, 'customTextDonationAmount');
                  console.log(store.getState());
                }}
              />
              
              
              <Button
                primary
                onClick={(event) => {
                  event.preventDefault();
                  this.props.dispatchChangeCheckoutStep(checkoutSteps.paymentDetails);
                  console.log(store.getState().checkoutStep)
                }}>Next Step
              </Button>
              
              
            </Form.Group>
        
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
  //border: 3px dotted pink;
`;
