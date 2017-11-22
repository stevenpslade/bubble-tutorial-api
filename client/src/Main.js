import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import UserStore from './stores/UserStore'
import SignUp from './views/SignUp'
import Bubble from './Bubble'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    UserStore.isLoggedIn() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signup',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class Main extends Component {

  constructor() {
    super();

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    // no on change actions yet
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={SignUp}/>
          <Route path='/signup' component={SignUp}/>
          <PrivateRoute path='/bubble' component={Bubble}/>
        </Switch>
      </main>
    );
  }
}

export default Main