import React, { Component } from 'react';
import '../../index.css';
import './Nav.css'
import { Navbar, NavItem } from 'react-materialize';
import axios from 'axios'

const URL = "http://ec2-54-201-167-124.us-west-2.compute.amazonaws.com:8080/supervisor/123";

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supervisor: ''
    }
  }

  componentDidMount() {
    var _this = this;
    axios.get(URL)
    .then(function(res){
      console.log(res)
      _this.setState({
        supervisor: res.data[0].supervisorname
      });
    })
    .catch(function(e) {
      console.log("ERROR ", e);
    })
  }
  render(){
    return(
      <Navbar className="myNav" brand="&nbsp;&nbsp;&nbsp;&nbsp;FLRApp" right fixed>

        <NavItem href='#' className='supervisor'>{this.state.supervisor}</NavItem>
      </Navbar>
    );
  }
}
