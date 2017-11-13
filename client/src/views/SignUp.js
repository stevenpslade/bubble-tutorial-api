import React, { Component } from 'react'
import UserStore from '../stores/UserStore'
import ServerActions from '../actions/ServerActionCreators.js'

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: UserStore.getUser(),
      errors: '',
      email: '',
      password: '',
      password_confirmation: ''
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
      errors: UserStore.getErrors()
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
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }

    ServerActions.signUp(submitObject);
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
          <label>
            Password Confirmation:
            <input name="password_confirmation" type="password" value={this.state.password_confirmation} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.showWelcomeUserMessage()}
        {this.getErrorMessages()}
      </div>
    );
  }
}

export default SignUp