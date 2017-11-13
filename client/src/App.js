import React, { Component } from 'react';
// import logo from './logo.svg';
import Header from './Header'
import Main from './Main'

class App extends Component {
  componentDidMount() {
    // window.fetch('http://api.stevenpslade.com/v1/sites/1/tutorials')
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    //   .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
      );
  }
}

export default App;
