import React, { Component } from 'react';
import '../App.css';

export default class Navbar extends Component{
  render(){
    return(
      <Navbar brand='logo' right>
        <NavItem href='get-started.html'>Getting started</NavItem>
        <NavItem href='components.html'>Components</NavItem>
      </Navbar>
    )
  }
}
