import React from "react";
import {css} from "emotion";
import {Button, Modal, Form, Input, Radio} from 'semantic-ui-react';

export default (props) => (
  <React.Fragment>
    <Modal.Header style={{ textAlign: 'center' }}>Process Complete. If you'd like to read more about our work, here are some of our most popular articles</Modal.Header>
    {/*<p className={header_p_style}>Subheading text here</p>*/}
    <Modal.Content >
      <Form>
        
        <div >
          <p className={link_p_style}><a href="#" className={link_style}>Results from our Africa program</a></p>
          <p className={link_p_style}><a href="#" className={link_style}>How donating to XYZ Charity helped me rekindle my passion for life</a></p>
          <p className={link_p_style}><a href="#" className={link_style}>One of our patient's incredible success stories (and the heartwarming way he sent it to us)</a></p>
        </div>
        
        <Form.Input
          type='hidden'
          name='step'
          value='4'
        />
        
        <div className={button_group_style}>
          <Button primary onClick={() => props.closeModal()}>Close</Button>
        </div>
      
      </Form>
    </Modal.Content>
  </React.Fragment>
)

const header_p_style = css`
  font-style: italic;
  margin: 0px 3vw;
  text-align: center;
`;

const field_group_style = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  //border: 3px dotted blueviolet;
`;

const button_group_style = css`
  display: flex;
  justify-content: center;
`;

const link_style = css`
  font-size: 1rem;
`;

const link_p_style = css`
    text-align: center;
    font-style: italic;
`;