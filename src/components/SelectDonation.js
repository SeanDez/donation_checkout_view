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
                control={Checkbox}
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
                control={Checkbox}
                label='$50'
                value={50}
                name='donation_amount'
                onChange={() => {
                  this.props.dispatchUpdateStateData('', 'customTextDonationAmount');
                  this.props.dispatchUpdateStateData('50', 'radioDonationAmount');
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
            </div>
  
            <div className={wrapperCenterStyle}>
              <Button
                primary
                onClick={(event) => {
                  event.preventDefault();
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