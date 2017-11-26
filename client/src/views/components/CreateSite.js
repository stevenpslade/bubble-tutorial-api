import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SiteStore from '../../stores/SiteStore'
import UserStore from '../../stores/UserStore'
import ServerActions from '../../actions/ServerActionCreators'

class CreateSite extends Component {

  constructor(props) {
    super(props);

    this.state = {
      site: '',
      url: '',
      errors: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onChange    = this._onChange.bind(this);
  }

  componentWillMount() {
    SiteStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SiteStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      site: SiteStore.getSite()
    });

    console.log(this.state.site);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let user = UserStore.getUser();
    let submitObject = {
      url: this.state.url,
      user_id: user.id
    }

    ServerActions.createSite(submitObject);
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
    if (this.state.site.id) {
      return (
        <Redirect to="/dashboard"/>
      );
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Site URL:
            <input name="url" type="text" value={this.state.url} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.getErrorMessages()}
      </div>
    );
  }
}

export default CreateSite