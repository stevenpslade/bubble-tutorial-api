import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserStore from './stores/UserStore'
import { Menu, Icon } from 'semantic-ui-react'

class Header extends Component {

  logout() {
    UserStore.logout();
  }

  loggedInDependentLinks() {
    let links = [];
    if (UserStore.isLoggedIn()) {
      links = [
        <li key="sign-out"><button onClick={this.logout}>Sign Out</button></li>,
        <li key="dashboard"><Link to='/dashboard'>Dashboard</Link></li>
      ];
    }

    return links;
  }

  render() {
    return (
      <Menu color='pink' inverted size='massive' borderless fixed='top'>
        <Menu.Item className='headerBrandText' header>SimpleBubble</Menu.Item>
      </Menu>
    );
  }
}

export default Header