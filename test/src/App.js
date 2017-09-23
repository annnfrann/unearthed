import React, { Component } from 'react';
import './index.css'

import Navbar from './components/Navbar'
import Sidenav from './components/Sidenav'
import Submitted from './components/Submitted'
import Approved from './components/Approved'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Sidenav />
        <Submitted />
        <Approved />
      </div>
    );
  }
}

export default App;
