import React, { Component } from 'react'
import TutorialStore from '../stores/TutorialStore'

class TutorialDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tutorialId: this.props.match.params.tutorialId,
      tutorial: TutorialStore.getTutorialData(this.props.match.params.tutorialId)
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
      tutorial: TutorialStore.getTutorialData(this.props.match.params.tutorialId)
    });
  }

  displayTutorialInfo() {
    if (this.state.tutorial) {
      let tutorial = this.state.tutorial;
      let tutorialItems = [];

      for (let i = 0; i < tutorial.tutorialItems.length; i++) {
        let item = tutorial.tutorialItems[i];
        tutorialItems.push(<li key={item.id}><b>{item.title}:</b> {item.content}</li>)
      }

      return (
        <div>
          <h3>{tutorial.name}</h3>
          <ul>
            {tutorialItems}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.displayTutorialInfo()}
      </div>
    );
  }
}

export default TutorialDetails