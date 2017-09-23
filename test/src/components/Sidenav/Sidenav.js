import React, { Component } from 'react';
import {SideNav, Button, SideNavItem} from 'react-materialize'
import './sidenav.css';

export default class Sidenav extends Component{
  render(){
    return(
      <SideNav id = "slide-out" className = "side-nav fixed" trigger={<p> </p>} >
        <SideNavItem href = '#!icon' ><div className = "white-text"> Home </div> < /SideNavItem>
        <SideNavItem href = '#!second' ><div className = "white-text"> Activated </div> < /SideNavItem>
        <SideNavItem href = '#!third' ><div className = "white-text"> Forms </div> < /SideNavItem>
        <SideNavItem href = '#!fourth' ><div className = "white-text"> Staff Reports </div> < /SideNavItem>
        <hr />
        <SideNavItem href = '#!fifth' ><div className = "white-text"> Settings </div> < /SideNavItem>
      < /SideNav>
    );
  }
}
