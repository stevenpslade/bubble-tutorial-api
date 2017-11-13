import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import SignUp from './views/SignUp'
import Bubble from './Bubble'

class Main extends Component {

  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={SignUp}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/bubble' component={Bubble}/>
        </Switch>
      </main>
    );
  }
}

export default Main