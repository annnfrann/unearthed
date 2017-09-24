import React, { Component } from 'react';
import {SideNav, Button, SideNavItem, Icon} from 'react-materialize'
import './sidenav.css';

export default class Sidenav extends Component{
  render(){
    return(
      <SideNav id = "slide-out" className = "side-nav fixed" trigger={<p> </p>} >
        <SideNavItem href = '#!icon' ><div className = "white-text"><Icon>home</Icon> Home </div> < /SideNavItem>

        <SideNavItem href = '#!second' ><div className = "white-text"><Icon>work</Icon> Tasks </div> < /SideNavItem>

        <SideNavItem href = '#!third' ><div className = "white-text"><Icon>insert_drive_file</Icon> Forms </div> < /SideNavItem>
  
        <SideNavItem href = '#!fourth' ><div className = "white-text"><Icon>face</Icon> Staff Reports </div> < /SideNavItem>
        <hr />
        <SideNavItem href = '#!fifth' ><div className = "white-text"><Icon>settings</Icon> Settings </div> < /SideNavItem>
      < /SideNav>
    );
  }
}
