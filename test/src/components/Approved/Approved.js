import React, { Component } from 'react';
import {Row, Col, Card, Modal, Button} from 'react-materialize'

import './approved.css';

export default class Approved extends Component{
  render(){
    return(
      <div>
        <h5 className = "approved">Approved FLRAs</h5>
        <Row className = "approvedCard">
          <Col m={4} s={12}>
            <Card className= 'card' textClassName='black-text' title='Employee Name' >
              <p>Task</p>
              <p>12:34pm 1/2/17</p>
                <Modal header='Modal Header' trigger={<Button flat className = "review">Review</Button>}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip e</p>
                </Modal>
            </Card>
          </Col>
          <Col m={4} s={12}>
            <Card className= 'card' textClassName='black-text' title='Employee Name' >
              <p>Task</p>
              <p>12:34pm 1/2/17</p>
                <Modal header='Modal Header' trigger={<Button flat className = "review">Review</Button>}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip e</p>
                </Modal>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
