import React from "react";
import {css} from "emotion";
import {Button, Modal, Form, Input, Radio} from 'semantic-ui-react';
import Axios from 'axios';
import store from '../reducer';
import "../App.css";

require('dotenv').load();

export default class Referrals extends React.Component {
  
  saveOptionalReferrals = (event) => {
    event.preventDefault();
    console.log('saveOptionalReferrals method fired');
    // Have axios do another post request
    return Axios.post("http://localhost:4000/api/donate", {
      referral1FirstName    : this.props.referral1FirstName,
      referral2FirstName    : this.props.referral2FirstName,
      referral1EmailAddress : this.props.referral1EmailAddress,
      referral2EmailAddress : this.props.referral2EmailAddress,
      checkoutStep          : this.props.checkoutStep,
      donorId               : this.props.donorId,
    })
      .then(response => {
        console.log('saveOptionalReferrals .then()');
        this.props.dispatchUpdateStateData(response.data.checkoutStep, 'checkoutStep')
      })
      .catch(e => console.log('error', e))
  };
  

  render() {
  return (
  <React.Fragment>
    <Modal.Header style={{ textAlign: 'center' }}>Thank you for donating! Would you like to refer 1 or 2 other people to our cause?</Modal.Header>
    <p className={header_p_style}>If so, please fill out one or two names below and we'll email these people some articles about what we do. We are very respectful of those recommended to us, and only mention donations subtley</p>
    <Modal.Content >
      <Form
        id='referralForm'
        onSubmit={this.saveOptionalReferrals}
      >
        
        <div className={all_referral_groups}>
          <Form.Group className={field_group_style}>
            <Form.Input
              placeholder='Name of Friend/Family Member'
              className='referralInput'
              name='referral_1_name'
              style={{ marginBottom: '1vh', width: "265px" }}
              onChange={e => {
                this.props.dispatchUpdateStateData(e.target.value, 'referral1FirstName');
                console.log(store.getState())
              }}
            />
            <Form.Input
              placeholder="This Person's Email"
              className='referralInput'
              name='referral_1_email'
              style={{ width: "265px" }}
              onChange={e => this.props.dispatchUpdateStateData(
                e.target.value, 'referral1EmailAddress'
              )}
            />
          </Form.Group>
  
          <Form.Group className={field_group_style}>
            <Form.Input
              placeholder='Another Friend/Family Member'
              className='referralInput'
              name='referral_2_name'
              style={{ marginBottom: '1vh', width: "265px" }}
              onChange={e => this.props.dispatchUpdateStateData(
                e.target.value, 'referral2FirstName'
              )}
            />
            <Form.Input
              placeholder="2nd Person's Email"
              className='referralInput'
              name='referral_2_email'
              style={{ width: "265px" }}
              onChange={e => this.props.dispatchUpdateStateData(
                e.target.value, 'referral2EmailAddress'
              )}
            />
          </Form.Group>
        </div>
  
        <div className={button_group_style}>
          <Button primary
            form='referralForm'
            type='submit'
            onClick={e => {
              console.log('e', e)
            }}
          >Refer Friends & Family</Button>
          {/*<button*/}
            {/*form='referralForm'*/}
            {/*type='submit'*/}
          {/*>HTML button</button>*/}
          <Button>No Thanks</Button>
        </div>
        
      </Form>
      
      
    </Modal.Content>
  </React.Fragment>
  )}}

const header_p_style = css`
  font-style: italic;
  margin: 0 3vw;
  padding-top: 10px;
  text-align: center;
`;

const field_group_style = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  //border: 3px dotted blueviolet;
`;

const button_group_style = css`
  display: flex;
  justify-content: center;
`;

const all_referral_groups = css`
  display: flex;
  //justify-content: center;
  //align-items: center;
  //border: 3px dotted pink;
  margin-left: auto !important;
  margin-right: auto !important;
`;


