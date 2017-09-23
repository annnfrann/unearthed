import React, { Component } from 'react';
import '../index.css';
import { Navbar, NavItem } from 'react-materialize';

export default class Nav extends Component{
  render(){
    return(
      <Navbar brand='logo' right>
        <NavItem href='get-started.html'>Getting started</NavItem>
        <NavItem href='components.html'>Components</NavItem>
      </Navbar>
    );
  }
}
