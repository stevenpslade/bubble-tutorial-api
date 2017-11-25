import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserStore from './stores/UserStore'

class Header extends Component {

  logout() {
    UserStore.logout();
  }

  loggedInDependentLinks() {
    let links = '';
    if (UserStore.isLoggedIn()) {
      links = (<li key="sign-out"><button onClick={this.logout}>Sign Out</button></li>);
    } else {
      links = [
        <li key="sign-up"><Link to='/signup'>Sign Up</Link></li>,
        <li key="login"><Link to='/login'>Login</Link></li>
      ];
    }

    return links;
  }

  render() {
    return (
      <header>
      <nav>
        <ul>
          {this.loggedInDependentLinks()}
          <li key="bubble"><Link to='/bubble'>Bubble</Link></li>
        </ul>
      </nav>
    </header>
    );
  }
}

export default Header