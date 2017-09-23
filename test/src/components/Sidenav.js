import React, { Component } from 'react';
import {SideNav, Button, SideNavItem} from 'react-materialize'
import '../index.css';

export default class Sidenav extends Component{
  render(){
    return(
      <SideNav id = "slide-out" className = "side-nav fixed" trigger={<p> </p>} >
	       <SideNavItem userView
        		user={{
        			background: 'img/office.jpg',
        			image: 'img/yuna.jpg',
        			name: 'John Doe',
        			email: 'jdandturk@gmail.com'
        		}}
	         />
	         <SideNavItem href = '#!icon' icon = 'cloud' > First Link With Icon < /SideNavItem>
	         <SideNavItem href='#!second'>Second Link< /SideNavItem >
           <SideNavItem divider/> < SideNavItem subheader > Subheader < /SideNavItem>
           <SideNavItem waves href='#!third'>Third Link With Waves< /SideNavItem >
           < /SideNav>

    );
  }
}
