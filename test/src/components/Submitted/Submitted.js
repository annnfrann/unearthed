import React, {Component} from 'react';
import {Row, Col, CardPanel, Card, Button, Modal, T, i18n, Icon} from 'react-materialize'
import axios from 'axios'
import './submitted.css';

const URL = "http://ec2-54-201-167-124.us-west-2.compute.amazonaws.com:8080/supervisor/123";

export default class Submitted extends Component {
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

  render() {
    const renderForm = this.state.forms.map(function(form, i) {
      if (form.riskidentified.supervisorapproved==="N"){
        return (
          <Col  key={ i } m={4} s={12}>
          <Card className= 'card' textClassName='black-text' title={form.employeename} >
          <p>{form.taskname}</p>
          <p>12:34pm 1/2/17</p>
          <Modal header={form.employeename} trigger={<Button flat className = "review">Review</Button>}>
             <p>Task: {form.taskname}</p>
             <p>Risks: {form.riskname}</p>
             <p>Risks: {form.riskidentified.heatindex}</p>
             <p>Mitigation Methods: {form.mitigationname}</p>
             <input className = "heatindex" type = "range" min="0" max="1" disabled value = {form.riskidentified.heatindex}></input>
             <p>Rate this FLRA:</p>
             {/* talk to bill where to send action */}
             <form action="#" method="update" id={form.employeename + i}><input name="supervisorscore" className = "supervisorscore" type = "range" min="0" max="10" defaultValue = "5" id ={ i }></input></form>
              <Button flat className = "approveButton" type="submit" form={form.employeename + i} onClick={function(e){console.log(document.getElementById( i ).value, {i})}} >approve</Button>
            {/* </button> */}
         </Modal>
        </Card>
       </Col>
      )}
    });

    return (
      <div>
        <h5 className="submitted">Submitted FLRAs</h5>
        <Row className = "submittedCard">
          {renderForm}

      </Row>
    </div>
    );
  }
}
