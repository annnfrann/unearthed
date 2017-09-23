import React, { Component } from 'react';
import {Row, Col, CardPanel} from 'react-materialize'

import './approved.css';

export default class Approved extends Component{
  render(){
    return(
      <div>
        <h5 className = "approved">Approved FLRAs</h5>
        <Row className = "approvedCard">
      		<Col s={12} m={5}>
      			<CardPanel className="teal lighten-4 black-text">
      				<span>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.</span>
      			</CardPanel>
      			<CardPanel className="teal lighten-4 black-text">
      				<span>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.</span>
      			</CardPanel>
      		</Col>
        </Row>
      </div>
    );
  }
}
