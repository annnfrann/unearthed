import React, { Component } from 'react';
import './index.css'

import Nav from './components/Nav/Nav'
import Sidenav from './components/Sidenav/Sidenav'
import Submitted from './components/Submitted/Submitted'
import Approved from './components/Approved/Approved'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Sidenav />
        <Submitted />
        <Approved />
      </div>
    );
  }
}

export default App;
