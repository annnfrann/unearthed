import React, { Component } from 'react';
import {Row, Col, Card, Modal, Button} from 'react-materialize'
import axios from 'axios'

import './approved.css';
const URL = "http://ec2-54-201-167-124.us-west-2.compute.amazonaws.com:8080/supervisor/123";

export default class Approved extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: []
    }
  }

  componentDidMount() {
    var _this = this;
    axios.get(URL)
    .then(function(res){
      console.log(res)
      _this.setState({
        forms: res.data
      });
    })
    .catch(function(e) {
      console.log("ERROR ", e);
    })
  }
  render(){
    const renderApproved = this.state.forms.map(function(form, i) {
      if (form.riskidentified.supervisorapproved==="Y"){
        return <Col  key={ i } m={4} s={12}>
     <Card className= 'card' textClassName='black-text' title={form.employeename} >
       <p className="taskName">{form.taskname}</p>
       <p>12:34pm 1/2/17</p>
         <Modal header={form.employeename} trigger={<Button flat className = "review">Review</Button>}>
           <p>Task: {form.taskname}</p>
           <p>Risks: {form.riskname}</p>
           <p>Mitigation Methods: {form.mitigationname}</p>
           <p>Supervisor Score: {form.riskidentified.supervisorscore}</p>
         </Modal>
     </Card>
   </Col>

      }
    });

    return (
      <div>
        <h5 className="submitted">Approved FLRAs</h5>
        <Row className = "submittedCard">
          {renderApproved}

      </Row>
    </div>
    );
  }
}
