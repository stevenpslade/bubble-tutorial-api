import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
// The Header creates links that can be used to navigate
// between routes.
  render() {
    return (
      <header>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/bubble'>Bubble</Link></li>
        </ul>
      </nav>
    </header>
    );
  }
}

export default Header