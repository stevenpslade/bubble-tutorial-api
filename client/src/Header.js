import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserStore from './stores/UserStore'
import { Menu, Icon, Button } from 'semantic-ui-react'

class Header extends Component {

  logout() {
    UserStore.logout();
  }

  loggedInDependentLinks() {
    let links = [];
    if (UserStore.isLoggedIn()) {
      links = [
        <Menu.Item position='right'>
          <Button inverted onClick={this.logout}>Sign Out</Button>
        </Menu.Item>
      ];
    }

    return links;
  }

  render() {
    return (
      <Menu color='pink' inverted borderless fixed='top'>
        <Menu.Item className='headerBrandText' header as='h3'>SimpleBubble</Menu.Item>
        {this.loggedInDependentLinks()}
      </Menu>
    );
  }
}

export default Header