import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import UserStore from '../stores/UserStore'
import ServerActions from '../actions/ServerActionCreators'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
require('../style/login.css');

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: UserStore.getUser(),
      authenticated: UserStore.isLoggedIn(),
      errors: '',
      email: '',
      password: '',
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
      password: this.state.password
    }

    setTimeout(function () {
      ServerActions.login(submitObject);
    }, 500);
  }

  getErrorMessages() {
    let message = [];
    if (this.state.errors) {
      let errorObj = this.state.errors;
      let errorCnt = 0;
      for (const error in errorObj) {
        message.push(
          error + ': ' + errorObj[error][0]
        );

        errorCnt++;
      }

      return (
        <Message
          floating
          error
          header='Error'
          list={message}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.state.authenticated) {
      return (
        <Redirect to="/dashboard"/>
      );
    }

    return (
      <div className='loginForm'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='pink' textAlign='center'>
              Sign in to SimpleBubble
            </Header>
            <Form size='large' onSubmit={this.handleSubmit} loading={this.state.loading}>
              <Segment>
                <Form.Input name='email' value={this.state.email} onChange={this.handleChange} fluid icon='user' iconPosition='left' placeholder='Email address' error={this.getErrorMessages() !== null ? true : false}/>
                <Form.Input name='password' value={this.state.password} onChange={this.handleChange} fluid icon='lock' iconPosition='left' placeholder='Password' type='password' error={this.getErrorMessages() !== null ? true : false}/>
                <Form.Button content='SIGN IN' color='pink' fluid size='large' />
              </Segment>
            </Form>
            <Message>
              Don't have an account? <Link className='signUpLink' to='/signup'>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login