import React, { Component } from 'react';
import '../../index.css';
import './Nav.css'
import { Navbar, NavItem } from 'react-materialize';

export default class Nav extends Component{
  render(){
    return(
      <Navbar className="myNav" brand="&nbsp;&nbsp;&nbsp;&nbsp;FLRApp" right fixed>
        <NavItem href='#' className='supervisor'>Mr. Supervisor</NavItem>
      </Navbar>
    );
  }
}
