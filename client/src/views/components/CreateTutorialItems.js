import React, { Component } from 'react'
import ServerActions from '../../actions/ServerActionCreators'
import TutorialStore from '../../stores/TutorialStore'

class CreateTutorialItems extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      order: 0,
      cssSelector: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onChange    = this._onChange.bind(this);
  }

  componentWillMount() {
    TutorialStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TutorialStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    if (!TutorialStore.getErrors()) {
      this.setState({
        title: '',
        content: '',
        order: 0,
        cssSelector: ''
      });
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    let submitObject = {
      title: this.state.title,
      content: this.state.content,
      order: this.state.order,
      cssSelector: this.state.cssSelector,
      tutorialId: this.props.tutorialId
    }

    ServerActions.addTutorialItem(submitObject);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Title:
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
          </label>
          <label>
            Content:
            <input name="content" type="text" value={this.state.content} onChange={this.handleChange} />
          </label>
          <label>
            Order:
            <input name="order" type="number" value={this.state.order} onChange={this.handleChange} />
          </label>
          <label>
            CSS Selector:
            <input name="cssSelector" type="text" value={this.state.cssSelector} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateTutorialItems