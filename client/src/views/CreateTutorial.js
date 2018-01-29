import React, { Component } from 'react'
import ServerActions from '../actions/ServerActionCreators'
import TutorialStore from '../stores/TutorialStore'
import SiteStore from '../stores/SiteStore'
import UserStore from '../stores/UserStore'
import CreateTutorialItems from './components/CreateTutorialItems'
//import { Link } from 'react-router-dom'
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class CreateTutorial extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      loading: false,
      tutoialCreated: false,
      tutorialId: null,
      tutorialItemsInProgress: true,
      name: '',
      pageUrl: '',
      skippable: false,
      showSteps: true,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onChange    = this._onChange.bind(this);
  }

  componentWillMount() {
    const { match: { params } } = this.props;
    
    if (params.tutorialId) {
      TutorialStore.setTutorialId(params.tutorialId);
      TutorialStore.setTutorialCreated(true);

      this.setState({
        tutoialCreated: true,
        tutorialId: params.tutorialId
      });
    } else {
      TutorialStore.setTutorialId(this.state.tutorialId);
      TutorialStore.setTutorialCreated(this.state.tutorialCreated);
    }

    TutorialStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TutorialStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      tutoialCreated: TutorialStore.tutorialCreated(),
      tutorialId: TutorialStore.getTutorialId(),
      errors: TutorialStore.getErrors()
    });
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
      name: this.state.name,
      pageUrl: this.state.pageUrl,
      skippable: this.state.skippable,
      showSteps: this.state.showSteps,
      userId: UserStore.getUserId(),
      siteId: SiteStore.getSiteId()
    }

    ServerActions.addTutorial(submitObject);
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

  // tutorialForm() {
  //   return (
  //     <form onSubmit={this.handleSubmit}>
  //       <label>
  //         Name:
  //         <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
  //       </label>
  //       <label>
  //         Page URL:
  //         <input name="pageUrl" type="text" value={this.state.pageUrl} onChange={this.handleChange} />
  //       </label>
  //       <label>
  //         Skippable:
  //         <input name="skippable" type="checkbox" checked={this.state.skippable} onChange={this.handleChange} />
  //       </label>
  //       <label>
  //         Show Steps:
  //         <input name="showSteps" type="checkbox" checked={this.state.showSteps} onChange={this.handleChange} />
  //       </label>
  //       <input type="submit" value="Submit" />
  //     </form>
  //   );
  // }

  tutorialForm() {
    return (
      <Grid style={{ height: '100%' }} verticalAlign='middle' textAlign='center'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='pink' textAlign='center'>
            Add New Bubble Stream
          </Header>
          <Form size='large' onSubmit={this.handleSubmit} loading={this.state.loading} error={this.getErrorMessages().length > 0 ? true : false}>
            <Segment textAlign='left'>
              <Form.Input name='name' label='Name' value={this.state.name} onChange={this.handleChange} fluid />
              <Form.Input name='pageUrl' label='Page URL' value={this.state.pageURL} onChange={this.handleChange} fluid />
              <Form.Checkbox name='skippable' label='Can users skip this stream?' checked={this.state.skippable} onChange={this.handleChange} />
              <Form.Checkbox name='showSteps' label='Show Steps' checked={this.state.showSteps} onChange={this.handleChange} />
              <Message error list={this.getErrorMessages()} />
              <Form.Button content='NEXT' color='pink' fluid size='large' />
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }

  render() {
    let form = null;
    if (this.state.tutoialCreated) {
      form = <CreateTutorialItems tutorialId={this.state.tutorialId} />;
    } else {
      form = this.tutorialForm();
    }

    return (
      <div className='createTutorialContainer' style={{ marginTop: '9em' }}>
        {form}
      </div>
    );
  }
}

export default CreateTutorial