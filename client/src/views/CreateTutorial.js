import React, { Component } from 'react'
import ServerActions from '../actions/ServerActionCreators'
import TutorialStore from '../stores/TutorialStore'
import SiteStore from '../stores/SiteStore'
import UserStore from '../stores/UserStore'
import CreateTutorialItems from './components/CreateTutorialItems'
import HeaderBar from '../Header'
import EditRail from './components/EditRail'
import { Link } from 'react-router-dom'
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

class CreateTutorial extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: '',
      loading: false,
      tutoialCreated: false,
      tutorialId: null,
      editItemId: null,
      tutorialInProgress: null,
      name: '',
      pageUrl: '',
      skippable: false,
      showSteps: true,
    }

    const { match: { params } } = this.props;
    this.params = params;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onChange    = this._onChange.bind(this);
  }

  componentWillMount() {
    if (this.params.tutorialId && this.params.action === 'add') {
      TutorialStore.setTutorialId(this.params.tutorialId);
      TutorialStore.setTutorialCreated(true);

      this.setState({
        tutoialCreated: true,
        tutorialId: this.params.tutorialId,
        tutorialInProgress: TutorialStore.getTutorialData(this.params.tutorialId)
      });
    } else if (this.params.tutorialId && this.params.action === 'edit') {
      TutorialStore.setTutorialId(this.params.tutorialId);

      this.setState({
        tutorialId: this.params.tutorialId,
        tutorialInProgress: TutorialStore.getTutorialData(this.params.tutorialId)
      });

      let tutorial = TutorialStore.getTutorialData(this.params.tutorialId);

      if (tutorial) {
        this.setState({
          name: tutorial.name,
          pageUrl: tutorial.page_url,
          skippable: tutorial.skippable,
          showSteps: tutorial.show_steps
        });
      }
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
    let tutorialId = TutorialStore.getTutorialId();

    this.setState({
      tutoialCreated: TutorialStore.tutorialCreated(),
      tutorialId: tutorialId,
      tutorialInProgress: TutorialStore.getTutorialData(tutorialId),
      errors: TutorialStore.getErrors(),
    });

    if (this.params.action === 'edit') {
      let tutorial = this.state.tutorialInProgress;

      this.setState({
        name: tutorial.name,
        pageUrl: tutorial.page_url,
        skippable: tutorial.skippable,
        showSteps: tutorial.show_steps
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
      name: this.state.name,
      pageUrl: this.state.pageUrl,
      skippable: this.state.skippable,
      showSteps: this.state.showSteps,
      userId: UserStore.getUserId(),
      siteId: SiteStore.getSiteId()
    }

    if (this.params.action === 'add') {
      ServerActions.addTutorial(submitObject);
    } else if (this.params.action === 'edit') {
      submitObject.id = this.state.tutorialInProgress.id;
      ServerActions.editTutorial(submitObject);
    }
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

  goToEditItem(id, tutorial = false) {
    if (tutorial) {
      this.setState({
        editItemId: null
      });
    } else {
      this.setState({
        editItemId: id
      });
    }
  }

  tutorialForm() {
    return (
      <Grid style={{ height: '100%' }} verticalAlign='middle' textAlign='center'>
        <Grid.Column style={{ maxWidth: 550 }}>
          <Header as='h2' color='pink' textAlign='center'>
            {this.params.action === 'edit' ? 'Edit Bubble Stream' : 'Add New Bubble Stream'}
          </Header>
          <Form size='large' onSubmit={this.handleSubmit} loading={this.state.loading} error={this.getErrorMessages().length > 0 ? true : false}>
            <Segment textAlign='left'>
              { this.params.action === 'edit' && this.state.tutorialInProgress ? <EditRail tutorial={this.state.tutorialInProgress} goToEditItem={this.goToEditItem.bind(this)} /> : null }
              <Form.Input name='name' label='Name' value={this.state.name} onChange={this.handleChange} fluid />
              <Form.Input name='pageUrl' label='Page URL' value={this.state.pageUrl} onChange={this.handleChange} fluid />
              <Form.Checkbox name='skippable' label='Stream can be skipped' checked={this.state.skippable} onChange={this.handleChange} />
              <Form.Checkbox name='showSteps' label='Show Steps' checked={this.state.showSteps} onChange={this.handleChange} />
              <Message error list={this.getErrorMessages()} />
              <Form.Button content={this.params.action === 'add' ? 'NEXT' : 'SAVE'} color='pink' fluid size='large' />
            </Segment>
          </Form>
          <Message>
            All done? <Link to='/dashboard' style={{ color: '#e03997' }}>Back to Dashboard</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }

  getTutorialItem(itemId) {
    let tutorial = this.state.tutorialInProgress;

    if (tutorial && itemId > 0) {
      let tutorialItems = tutorial.tutorialItems;

      for (let i = 0; i < tutorialItems.length; i++) {
        let item = tutorialItems[i];

        if (item.id === itemId) {
          return item;
        }
      }
    } else {
      let item = {
        title: '',
        content: '',
        order: 0,
        css_selector: '',
        id: -1
      };

      return item;
    }
  }

  render() {
    let form = null;
    if ( (this.state.tutoialCreated && this.state.tutorialInProgress) || (this.state.editItemId && this.state.tutorialInProgress) ) {
      let tutorialItem = this.getTutorialItem(this.state.editItemId);
      form = <CreateTutorialItems action={this.params.action} tutorialId={this.state.tutorialId} item={tutorialItem} tutorialInProgress={this.state.tutorialInProgress} getErrorMessages={this.getErrorMessages.bind(this)} goToEditItem={this.goToEditItem.bind(this)} />;
    } else {
      form = this.tutorialForm();
    }

    return (
      <div className='createTutorialContainer' style={{ marginTop: '9em' }}>
        <HeaderBar subMenu={false} />
        {form}
      </div>
    );
  }
}

export default CreateTutorial