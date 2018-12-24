import React from "react";
import {css} from "emotion";
import {Button, Modal, Form, Input, Radio} from 'semantic-ui-react';
import Axios from 'axios';
import store from '../reducer';
import "../App.css";
import Validator from "validator";

require('dotenv').load();

export default class Referrals extends React.Component {
  
  state = {
    canNotSaveAReferral : true
  };
  
  saveOptionalReferrals = (event) => {
    event.preventDefault();
    console.log('saveOptionalReferrals method fired');
    // Have axios do another post request
    return Axios.post(`${process.env.REACT_APP_API_POST_DOMAIN}/api/donate`, {
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
  
  checkIfCanSaveAReferral() {
    if (Validator.isEmail(this.props.referral1EmailAddress)) {
      this.setState({
        canNotSaveAReferral : false // careful. double inversion
      })
    } else {
      this.setState({
        canNotSaveAReferral : true
      })
    }
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.referral1EmailAddress !== this.props.referral1EmailAddress) {
      this.checkIfCanSaveAReferral();
      console.log('local state after CDU', this.state)
    }
  }
  
  
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
          <Form.Group className={field_group_style} style={{ position : 'relative' }}>
            <Form.Input
              placeholder='Name of Friend/Family Member'
              className={inputStyle}
              style={{ marginBottom: '1vh', flexBasis: '285px !important' }}
              onChange={e => {
                this.props.dispatchUpdateStateData(e.target.value, 'referral1FirstName');
                console.log(store.getState())
              }}
            />
            <Form.Input
              placeholder="This Person's Email"
              className={inputStyle}
              style={{ maxWidth : '100%', flexBasis: '285px' }}
              onChange={e => {
                this.props.dispatchUpdateStateData(
                e.target.value, 'referral1EmailAddress');
              console.log('getState()', store.getState())
              }}
            />
          </Form.Group>
  
          <Form.Group className={field_group_style}>
            <Form.Input
              placeholder='Another Friend/Family Member'
              className={inputStyle}
              style={{ marginBottom: '1vh', flexBasis: '285px' }}
              onChange={e => this.props.dispatchUpdateStateData(
                e.target.value, 'referral2FirstName'
              )}
            />
            <Form.Input
              placeholder="2nd Person's Email"
              className={inputStyle}
              style={{ flexBasis: '285px' }}
              onChange={e => this.props.dispatchUpdateStateData(
                e.target.value, 'referral2EmailAddress'
              )}
            />
          </Form.Group>
        </div>
  
        <div className={button_group_style}>
          <Button primary
            disabled={this.state.canNotSaveAReferral}
            form='referralForm'
            type='submit'
            onClick={e => {
              console.log('e', e)
            }}
          >Refer Friends & Family</Button>
          <Button
            type='button' // removes auto-submit
            onClick={(event) => {
              event.preventDefault();
              this.props.dispatchUpdateStateData('articlesList', 'checkoutStep')
            }}
          >No Thanks</Button>
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
  margin-right: 1vw !important;
  //border: 3px dotted blueviolet;
`;

const button_group_style = css`
  display: flex;
  justify-content: center;
  margin-top: 2vh;
`;

const all_referral_groups = css`
  display: flex;
  justify-content: center;
  //align-items: center;
  //border: 3px dotted pink;
  margin-left: auto !important;
  margin-right: auto !important;
`;

const inputStyle = css`
   min-width : 100% !important;
   //border: 3px dotted forestgreen !important;
`;
