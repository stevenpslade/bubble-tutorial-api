import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserStore from './stores/UserStore'
import SiteStore from './stores/SiteStore'
import { Container, Menu, Icon, Button, Modal, Message } from 'semantic-ui-react'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeModalShow: false,
      site: SiteStore.getSite()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    SiteStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SiteStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      site: SiteStore.getSite(),
    });
  }

  logout() {
    UserStore.logout();
  }

  loggedInDependentLinks() {
    let links = null;
    if (UserStore.isLoggedIn()) {
      links = (
        <Menu.Item position='right'>
          <Button inverted onClick={this.logout}>Sign Out</Button>
        </Menu.Item>
      );
    }

    return links;
  }

  handleModalOpen = () => this.setState({ codeModalShow: true })
  handleModalClose = () => this.setState({ codeModalShow: false })

  displaySubMenu() {
    let subMenu = null;

    if (UserStore.isLoggedIn()) {
      subMenu = (
        <Menu className='actionSubMenu' fixed='top' style={{ zIndex: '1', background: 'rgba(255, 255, 255, 0.65)' }}>
          <Container text>
            <Menu.Item as='a' header style={{ color: '#e03997' }}><Icon size='large' color='pink' name='add circle' />Add</Menu.Item>
            <Menu.Item as='a' header
              onClick={this.handleModalOpen}
              position='right'
              style={{ borderRight: '1px solid rgba(34,36,38,.1)', color: '#e03997' }}>
                <Icon size='large' color='pink' name='code' />{this.state.site.url}
              </Menu.Item>
          </Container>
        </Menu>
      );
    }

    return subMenu;
  }

  codeSnippetModal() {
    let scriptCode = `<script id="bubbleScript" site_id="${this.state.site.id}" src="https://www.stevenpslade.com/tutorial.js"></script>`;

    return (
      <Modal open={this.state.codeModalShow} onClose={this.handleModalClose} dimmer='blurring' size='small' closeOnDimmerClick>
        <Modal.Content>
          <h3>Copy & Paste this code to your site's footer</h3>
          <Message style={{ textAlign: 'center' }} 
            color='pink'
            content={scriptCode} />
        </Modal.Content>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        <Menu color='pink' inverted borderless fixed='top'>
          <Menu.Item className='headerBrandText' header as='h3'>SimpleBubble</Menu.Item>
          {this.loggedInDependentLinks()}
        </Menu>
        {this.displaySubMenu()}
        {this.codeSnippetModal()}
      </div>
    );
  }
}

export default Header