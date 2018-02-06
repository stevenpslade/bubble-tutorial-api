import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserStore from './stores/UserStore'
import SiteStore from './stores/SiteStore'
import { Container, Menu, Icon, Button, Modal, Message, Header } from 'semantic-ui-react'

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeModalShow: false,
      site: SiteStore.getSite()
    }

    this._onChange = this._onChange.bind(this);
  }

  static defaultProps = {
      subMenu: true
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
    } else {
      links = (
        <Menu.Item position='right'>
          <Button as='a' href='/demo' inverted>Demo</Button>
        </Menu.Item>
      );
    }

    return links;
  }

  handleModalOpen = () => this.setState({ codeModalShow: true });
  handleModalClose = () => this.setState({ codeModalShow: false });

  displaySubMenu() {
    let subMenu = null;

    if (UserStore.isLoggedIn() && this.props.subMenu) {
      subMenu = (
        <Menu className='actionSubMenu' fixed='top' style={{ zIndex: '1', background: 'rgba(255, 255, 255, 0.65)' }}>
          <Container text>
            <Menu.Item as={Link} to='/bubbles/add' header style={{ color: '#e03997' }}><Icon size='large' color='pink' name='add circle' />Add</Menu.Item>
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
    let scriptCode = `<script id="bubbleScript" site_id="${this.state.site.id}" src="https://www.simplebubble.xyz/tutorial.js"></script>`;
    let modal = null;

    if (UserStore.isLoggedIn()) {
      modal = (
        <Modal open={this.state.codeModalShow} onClose={this.handleModalClose} dimmer='blurring' size='small' closeOnDimmerClick>
          <Modal.Content>
            <Header as='h2' color='pink'>Code Snippet</Header>
            <p style={{ fontSize: '1.2em' }}>Copy the following code snippet and paste it in your site's code, just before the
            ending body tag (<code>&lt;/body&gt;</code>).</p>
            <Message style={{ textAlign: 'center' }} color='black' content={scriptCode} />
          </Modal.Content>
        </Modal>
      );
    }

    return modal;
  }

  render() {
    return (
      <div>
        <Menu color='pink' inverted borderless fixed='top'>
          <Menu.Item className='headerBrandText' header style={{ fontSize: '1.3em' }} as={Link} to='/dashboard'>SimpleBubble</Menu.Item>
          {this.loggedInDependentLinks()}
        </Menu>
        {this.displaySubMenu()}
        {this.codeSnippetModal()}
      </div>
    );
  }
}

export default HeaderBar