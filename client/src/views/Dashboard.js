import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Dashboard extends Component {

  render() {
    return (
      <div>
        <p>Welcome to Simple Bubble!</p>
        <ul>
          <li><Link to='/bubbles/add'>Add Bubble Flow</Link></li>
          <li><Link to='/bubbles'>Show Bubbles</Link></li>
        </ul>
      </div>
    );
  }
}

export default Dashboard