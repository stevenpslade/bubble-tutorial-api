import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserStore from './stores/UserStore'
import { Container, Menu, Icon, Button, Dropdown } from 'semantic-ui-react'

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

  displaySubMenu() {
    let subMenu = null;

    if (UserStore.isLoggedIn()) {
      subMenu = (
        <Menu fixed='top' style={{ top: '7.5%', background: 'rgba(255, 255, 255, 0.65)' }}>
          <Container text>
            <Menu.Item as='a' header><Icon size='large' color='pink' name='add circle' /> Add</Menu.Item>
            <Menu.Item as='a' header position='right' style={{ borderRight: '1px solid rgba(34,36,38,.1)' }}><Icon size='large' color='pink' name='code' /> www.example.com</Menu.Item>
          </Container>
        </Menu>
      );
    }

    return subMenu;
  }

  render() {
    return (
      <div>
        <Menu color='pink' inverted borderless fixed='top'>
          <Menu.Item className='headerBrandText' header as='h3'>SimpleBubble</Menu.Item>
          {this.loggedInDependentLinks()}
        </Menu>
        {this.displaySubMenu()}
      </div>
    );
  }
}

export default Header