import React, { Component } from 'react';
import '../../index.css';
import './Nav.css'
import { Navbar, NavItem } from 'react-materialize';

export default class Nav extends Component{
  render(){
    return(
      <Navbar className="myNav" brand="FLRApp" right>
        <NavItem href='#' className='supervisor'>Mr. Supervisor</NavItem>
      </Navbar>
    );
  }
}
