import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SiteStore from '../../stores/SiteStore'
import UserStore from '../../stores/UserStore'
import ServerActions from '../../actions/ServerActionCreators'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
require('../../style/components/createSite.css');

class CreateSite extends Component {

  constructor(props) {
    super(props);

    this.state = {
      site: '',
      url: '',
      errors: '',
      loading: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onChange    = this._onChange.bind(this);
  }

  componentWillMount() {
    SiteStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SiteStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      site: SiteStore.getSite(),
      errors: SiteStore.getErrors(),
      loading: false
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({loading: true});

    let user = UserStore.getUser();
    let submitObject = {
      url: this.state.url,
      user_id: user.id
    }

    ServerActions.createSite(submitObject);
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

  render() {
    if (this.state.site.id) {
      return (
        <Redirect to="/dashboard"/>
      );
    }

    return (
      <div className='addSiteForm'>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='pink' textAlign='center'>
              Add your site
            </Header>
            <Form size='large' onSubmit={this.handleSubmit} loading={this.state.loading} error={this.getErrorMessages().length > 0 ? true : false}>
              <Segment>
                <Form.Input name='url' value={this.state.url} onChange={this.handleChange} fluid icon='browser' iconPosition='left' placeholder='https://www.example.com' />
                <Message error list={this.getErrorMessages()} />
                <Form.Button content='FINISH' color='pink' fluid size='large' />
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default CreateSite