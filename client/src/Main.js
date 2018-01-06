import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import UserStore from './stores/UserStore'
import ServerActions from './actions/ServerActionCreators'
import SignUp from './views/SignUp'
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import CreateTutorial from './views/CreateTutorial'
import Tutorials from './views/Tutorials'

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

  constructor(props) {
    super(props);
    this.state = { authenticated: UserStore.isLoggedIn() };

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    UserStore.addChangeListener(this._onChange);

    if (this.state.authenticated) {
      ServerActions.getUser();
    }
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    // on change stuff here
  }

  render() {
    return (
      <main>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/login' component={Login}/>
          <PrivateRoute path='/dashboard' component={Dashboard}/>
          <PrivateRoute path='/bubbles/add/:tutorialId?' component={CreateTutorial}/>
          <PrivateRoute path='/bubbles/:tutorialId?' component={Tutorials}/>
          <PrivateRoute exact path='*' component={Dashboard}/>
        </Switch>
      </main>
    );
  }
}

export default Main