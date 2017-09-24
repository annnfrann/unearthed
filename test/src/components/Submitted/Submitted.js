import React, {Component} from 'react';
import {Row, Col, CardPanel, Card, Button, Modal} from 'react-materialize'
import axios from 'axios'
import './submitted.css';

const URL = "http://10.2.4.161:8080/supervisor/123";

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
        return <Col  key={ i } m={4} s={12}>
     <Card className= 'card' textClassName='black-text' title={form.employeename} >
       <p>{form.taskname}</p>
       <p>12:34pm 1/2/17</p>
         <Modal header='Modal Header' trigger={<Button flat className = "review">Review</Button>}>
           <p>data</p>
           <Button waves='light'>button</Button>
         </Modal>
     </Card>
   </Col>

      }
    });

    return (
      <div>
        <h5 className="submitted">Submitted FLRAs</h5>
        <Row className = "submittedCard">
          {renderForm}

      </Row>
    </div>
        /* <Row className = "submittedCard">
          <Col m={4} s={12}>
            <Card className= 'card' textClassName='black-text' title={employeeName} >
              <p>{taskName}</p>
              <p>12:34pm 1/2/17</p>
                <Modal header='Modal Header' trigger={<Button flat className = "review">Review</Button>}>
                  <p>data</p>
                  <Button waves='light'>button</Button>
                </Modal>
            </Card>
          </Col>
          <Col m={4} s={12}>
            <Card className= 'card' textClassName='black-text' title='Employee Name' >
              <p>Task</p>
              <p>12:34pm 1/2/17</p>
                <Modal header='Modal Header' trigger={<Button flat className = "review">Review</Button>}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip e</p>
                  <Button waves='light'>button</Button>
                </Modal>
            </Card>
          </Col>
          <Col m={4} s={12}>
            <Card className= 'card' textClassName='black-text' title='Employee Name' >
              <p>Task</p>
              <p>12:34pm 1/2/17</p>
                <Modal header='Modal Header' trigger={<Button flat className = "review">Review</Button>}>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip e</p>
                  <Button waves='light'>button</Button>
                </Modal>
            </Card>
          </Col>
          <Col m={4} s={12}>
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
      </div> */
    );
  }
}
