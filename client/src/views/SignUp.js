import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import UserStore from '../stores/UserStore'
import SiteStore from '../stores/SiteStore'
import ServerActions from '../actions/ServerActionCreators'
import CreateSite from './components/CreateSite'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
require('../style/signUp.css');

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: UserStore.getUser(),
      siteId: SiteStore.getSiteId(),
      authenticated: UserStore.isLoggedIn(),
      errors: '',
      email: '',
      password: '',
      password_confirmation: '',
      loading: false
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
      siteId: SiteStore.getSiteId(),
      errors: UserStore.getErrors(),
      authenticated: UserStore.isLoggedIn(),
      loading: false
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

    this.setState({ loading: true });

    let submitObject = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }

    setTimeout(function () {
      ServerActions.signUp(submitObject);
    }, 500);
  }

  getErrorMessages() {
    let messages = [];
    if (this.state.errors) {
      let errorObj = this.state.errors;
      for (const error in errorObj) {
        messages.push(error + ': ' + errorObj[error][0]);
      }
    }

    return messages;
  }

  render() {
    if (this.state.authenticated && this.state.siteId === null) {
      return (
        <CreateSite />
      );
    } else if (this.state.authenticated && this.state.siteId !== null) {
      return (
        <Redirect to="/dashboard"/>
      );
    }

    return (
      <div className='signUpForm'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='pink' textAlign='center'>
              Create your account
            </Header>
            <Form size='large' onSubmit={this.handleSubmit} loading={this.state.loading} error={this.getErrorMessages().length > 0 ? true: false}>
              <Segment>
                <Form.Input name='email' value={this.state.email} onChange={this.handleChange} fluid icon='user' iconPosition='left' placeholder='Email address' />
                <Form.Input name='password' value={this.state.password} onChange={this.handleChange} fluid icon='lock' iconPosition='left' placeholder='Password' type='password' />
                <Form.Input name='password_confirmation' value={this.state.password_confirmation} onChange={this.handleChange} fluid icon='lock' iconPosition='left' placeholder='Confirm Password' type='password' />
                <Message error list={this.getErrorMessages()} />
                <Form.Button content='SUBMIT' color='pink' fluid size='large' />
              </Segment>
            </Form>
            <Message>
              Already have an account? <Link className='loginLink' to='/login'>Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SignUp