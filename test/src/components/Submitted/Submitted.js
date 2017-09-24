import React, {Component} from 'react';
import {Row, Col, CardPanel, Card, Button, Modal, T, i18n, Icon} from 'react-materialize'
import axios from 'axios'
import './submitted.css';


const URL = "http://ec2-54-201-167-124.us-west-2.compute.amazonaws.com:8080/supervisor/123/";
const postURL = "http://ec2-54-201-167-124.us-west-2.compute.amazonaws.com:8080/supervisor/"

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
          <p>{form.riskidentified.timesubmitted}</p>
          <Modal header={form.employeename} trigger={<Button flat className = "review">Review</Button>}>
              <h5><b>Time Submitted:</b> {form.riskidentified.timesubmitted}</h5>
             <h5><b>Task:</b> {form.taskname}</h5>
             <h5><b>Risks:</b> {form.riskname}</h5>
             <h5><b>Mitigation Methods:</b> {form.mitigationname}</h5>
             <h5><b>Minutes Spent:</b> {form.riskidentified.minutesspent}</h5>
             <br />
             <h5><b>Threat Level of Risk:</b></h5>
             <input className = "heatindex" type = "range" min="0" max="100" disabled value = {form.riskidentified.heatindex*100}></input>
             <h5><b>Rate this FLRA:</b></h5>
             {/* talk to bill where to send action */}
             <form action={postURL+form.riskidentified.idriskidentified} method="PUT" id={form.employeename + i}><input name="supervisorscore" className = "supervisorscore" type = "range" min="0" max="10" defaultValue = "5" id ={ i }></input><div className="indents"><p className="indent">0</p><p className="indent">1</p><p className="indent">2</p><p className="indent">3</p><p className="indent">4</p><p className="indent">5</p><p className="indent">6</p><p className="indent">7</p><p className="indent">8</p><p className="indent">9</p><p className="indent">10</p></div></form>
              {/* <Button flat className = "approveButton" type="submit" form={form.employeename + i} onClick={function(e){
                // axios.put({postURL+form.riskidentified.idriskidentified}){
                //
                //   "supervisorid": "123",
                //   "supervisorname": "Steve Smith",
                //   "riskidentified": {
                //   "idriskidentified": {form.riskidentified.idriskidentified},
                //   "employeeid": {form.riskidentified.employeeid},
                //   "formid": {form.riskidentified.formid},
                //   "taskid": {form.riskidentified.taskid},
                //   "riskid": {form.riskidentified.riskid},
                //   "mitigationid": {form.riskidentified.mitigationid},
                //   "heatindex": {form.riskidentified.heatindex},
                //   "supervisorscore": document.getElementById( i ).value,
                //   "supervisorapproved": "Y"
                //
                //
                // }
              } >approve</Button> */}
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
