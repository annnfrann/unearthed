import React, { Component } from 'react';
import './index.css'

import Nav from './components/Nav'
import Sidenav from './components/Sidenav'
import Submitted from './components/Submitted'
import Approved from './components/Approved'

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
