import React, {Component} from 'react';
import {Row, Col, CardPanel, Card, Button, Modal} from 'react-materialize'
import './submitted.css';

export default class Submitted extends Component {
  render() {
    return (
      <div>
        <h5 className="submitted">Submitted FLRAs</h5>
        <Row className = "submittedCard">
          <Col m={5} s={12}>
            <Card className= 'card' textClassName='black-text' title='Employee Name' >
              <p>Task</p>
              <p>12:34pm 1/2/17</p>
                <Modal header='Modal Header' trigger={<Button flat className = "review">Review</Button>}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip e</p>
                  <Button waves='light'>button</Button>
                </Modal>
            </Card>
          </Col>
        </Row>


        <Row className="submittedCard">
          <Col s={12} m={5}>
            <CardPanel className="card black-text">
              <span>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.</span>
            </CardPanel>
            <CardPanel className="card black-text">
              <span>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively. I am similar to what is called a panel in other frameworks.</span>
            </CardPanel>
          </Col>
        </Row>
      </div>
    );
  }
}
