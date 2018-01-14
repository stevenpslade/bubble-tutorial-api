import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SiteStore from '../stores/SiteStore'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteId: SiteStore.getSiteId()
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
      siteId: SiteStore.getSiteId()
    });
  }

  render() {
    let scriptCode = `<script id="bubbleScript" attr-site_id="${this.state.siteId}" src="https://www.stevenpslade.com/tutorial.js"></script>`;

    return (
      <div>
        <p>Welcome to Simple Bubble!</p>
        <ul>
          <li><Link to='/bubbles/add'>Add Bubble Flow</Link></li>
          <li><Link to='/bubbles'>Show Bubbles</Link></li>
        </ul>

        <p>Your bubble code:</p>
        <pre>{scriptCode}</pre>
      </div>
    );
  }
}

export default Dashboard