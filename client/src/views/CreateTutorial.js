import React, { Component } from 'react'
import ServerActions from '../actions/ServerActionCreators'
import TutorialStore from '../stores/TutorialStore'
import SiteStore from '../stores/SiteStore'
import UserStore from '../stores/UserStore'

class CreateTutorial extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tutoialCreated: false,
      tutorialItemsInProgress: true,
      name: '',
      pageUrl: '',
      skippable: false,
      showSteps: true,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onChange    = this._onChange.bind(this);
  }

  componentWillMount() {
    TutorialStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TutorialStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      tutoialCreated: TutorialStore.tutorialCreated()
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let submitObject = {
      name: this.state.name,
      pageUrl: this.state.pageUrl,
      skippable: this.state.skippable,
      showSteps: this.state.showSteps,
      userId: UserStore.getUserId(),
      siteId: SiteStore.getSiteId()
    }

    ServerActions.addTutorial(submitObject);
  }

  getErrorMessages() {
    let message = [];
    if (this.state.errors) {
      let errorObj = this.state.errors;
      let errorCnt = 0;
      for (const error in errorObj) {
        message.push(
          <p key={errorCnt}>Error with {error}: {errorObj[error][0]}</p>
        );

        errorCnt++;
      }
    } else {
      message = 'No Errors.';
    }

    return (
      <div>{message}</div>
    );
  }

  render() {
    if (this.state.tutoialCreated) {
      return (
        <p>Tutorial items add here.</p>
      );
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Page URL:
            <input name="pageUrl" type="text" value={this.state.pageUrl} onChange={this.handleChange} />
          </label>
          <label>
            Skippable:
            <input name="skippable" type="checkbox" checked={this.state.skippable} onChange={this.handleChange} />
          </label>
          <label>
            Show Steps:
            <input name="showSteps" type="checkbox" checked={this.state.showSteps} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.getErrorMessages()}
      </div>
    );
  }
}

export default CreateTutorial