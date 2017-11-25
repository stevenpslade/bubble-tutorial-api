import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import UserStore from '../stores/UserStore'
import ServerActions from '../actions/ServerActionCreators'

class Login extends Component {

  constructor() {
    super();
    this.state = {
      user: UserStore.getUser(),
      authenticated: UserStore.isLoggedIn(),
      errors: '',
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onChange    = this._onChange.bind(this);
  }

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      user: UserStore.getUser(),
      errors: UserStore.getErrors(),
      authenticated: UserStore.isLoggedIn()
    });
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

    let submitObject = {
      email: this.state.email,
      password: this.state.password
    }

    ServerActions.login(submitObject);
  }

  showWelcomeUserMessage() {
    let message = '';
    if (this.state.user.email) {
      message = 'Welcome, ' + this.state.user.email;
    } else {
      message = 'No user found.';
    }

    return (
      <p>{message}</p>
    );
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
    if (this.state.authenticated) {
      return (
        <Redirect to="/bubble"/>
      );
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.showWelcomeUserMessage()}
        {this.getErrorMessages()}
      </div>
    );
  }
}

export default Login