import React, { Component } from 'react'
import TutorialStore from '../stores/TutorialStore'
import { Link } from 'react-router-dom'

class Tutorial extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tutorialData: TutorialStore.getTutorialData()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    TutorialStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TutorialStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      tutorialData: TutorialStore.getTutorialData()
    });
  }

  getTutorialList() {
    let tutorialList = [];

    if (this.state.tutorialData) {
      let tutorialData = this.state.tutorialData;

      for (let i = 0; i < tutorialData.length; i++) {
        let tutorial = tutorialData[i];
        let tutorialLink = '/bubbles/' + tutorial.id;
        tutorialList.push(<li key={tutorial.id}><Link to={tutorialLink}>{tutorial.name}</Link></li>)
      }
    } else {
      tutorialList.push(<li key="nothingFound">Nothing found</li>)
    }

    return (
      <ul>
        {tutorialList}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <p>All Bubble Flows</p>
        {this.getTutorialList()}
      </div>
    );
  }
}

export default Tutorial