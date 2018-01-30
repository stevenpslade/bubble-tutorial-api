import React, { Component } from 'react'
import ServerActions from '../../actions/ServerActionCreators'
import TutorialStore from '../../stores/TutorialStore'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

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

  handleChange(event, data) {
    const target = event.target;
    const value = target.type ? target.value : data.checked;
    const name = target.name || data.name;

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
    let tutorialInProgress = this.props.tutorialInProgress;

    return (
      <Grid style={{ height: '100%' }} verticalAlign='middle' textAlign='center'>
        <Grid.Column style={{ maxWidth: 550 }}>
          <Header as='h2' color='pink' textAlign='center'>
            Adding Bubble to {tutorialInProgress.name}
          </Header>
          <Form size='large' onSubmit={this.handleSubmit} loading={this.state.loading} error={this.props.getErrorMessages().length > 0 ? true : false}>
            <Segment textAlign='left'>
              <Form.Input name='title' label='Title' value={this.state.title} onChange={this.handleChange} fluid />
              <Form.TextArea name='content' label='Main Content' maxLength='300' value={this.state.content} onChange={this.handleChange} />
              <Form.Input name='order' label='Order' type='number' value={this.state.order} onChange={this.handleChange} fluid />
              <Form.Input name='cssSelector' label='CSS Selector' value={this.state.cssSelector} onChange={this.handleChange} fluid />
              <Message error list={this.props.getErrorMessages()} />
              <Form.Button content='ADD' color='pink' fluid size='large' />
            </Segment>
          </Form>
          <Message>
            All done? <Link to='/dashboard' style={{ color: '#e03997' }}>Back to Dashboard</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CreateTutorialItems