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
          <p className="taskName">{form.taskname}</p>
          <p>12:34pm 1/2/17</p>
          <Modal header={form.employeename} trigger={<Button flat className = "review">Review</Button>}>
             <h5><b>Task:</b> {form.taskname}</h5>
             <h5><b>Risks:</b> {form.riskname}</h5>
             <h5><b>Mitigation Methods:</b> {form.mitigationname}</h5>
             <h5><b>Threat Level of Risk:</b></h5>
             <input className = "heatindex" type = "range" min="0" max="1" disabled value = {form.riskidentified.heatindex}></input>
             <h5><b>Rate this FLRA:</b></h5>
             {/* talk to bill where to send action */}
             <form action="#" method="update" id={form.employeename + i}><input name="supervisorscore" className = "supervisorscore" type = "range" min="0" max="10" defaultValue = "5" id ={ i }></input>&nbsp; &nbsp; 0 &emsp; &emsp; &nbsp; 1 &emsp; &emsp; &nbsp; 2 &emsp; &emsp; &nbsp;  3 &emsp; &emsp; &nbsp;  4 &emsp; &emsp; &nbsp;  5 &emsp; &emsp; &nbsp;  6 &emsp; &emsp; &nbsp;  7 &emsp; &emsp; &nbsp;  8 &emsp; &emsp; &nbsp;  9 &emsp; &emsp; &nbsp;  10   </form>
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
