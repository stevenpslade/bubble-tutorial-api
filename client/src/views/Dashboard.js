import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SiteStore from '../stores/SiteStore'
import TutorialStore from '../stores/TutorialStore'
import TutorialCard from './components/TutorialCard'
import { Button, Form, Grid, Header, Image, Message, Segment, Container, Item, Icon, Label } from 'semantic-ui-react'
import '../style/dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteId: SiteStore.getSiteId(),
      tutorialData: TutorialStore.getTutorialData()
    }

    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    SiteStore.addChangeListener(this._onChange);
    TutorialStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    SiteStore.removeChangeListener(this._onChange);
    TutorialStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      siteId: SiteStore.getSiteId(),
      tutorialData: TutorialStore.getTutorialData()
    });
  }

  getTutorialCards() {
    let tutorialList = [];

    if (this.state.tutorialData) {
      let tutorialData = this.state.tutorialData;

      for (let i = 0; i < tutorialData.length; i++) {
        let tutorial = tutorialData[i];
        //let tutorialLink = '/bubbles/' + tutorial.id;
        tutorialList.push(<TutorialCard id={tutorial.id} title={tutorial.name} itemCount={tutorial.tutorialItems.length} />);
      }
    }

    return (
      <Item.Group divided>
        {tutorialList}
      </Item.Group>
    );
  }

  render() {
    let scriptCode = `<script id="bubbleScript" site_id="${this.state.siteId}" src="https://www.stevenpslade.com/tutorial.js"></script>`;

    // return (
    //   <div>
    //     <p>Welcome to Simple Bubble!</p>
    //     <ul>
    //       <li><Link to='/bubbles/add'>Add Bubble Flow</Link></li>
    //       <li><Link to='/bubbles'>Show Bubbles</Link></li>
    //     </ul>

    //     <p>Your bubble code:</p>
    //     <pre>{scriptCode}</pre>
    //   </div>
    // );

    return (
      <div className='dashboardContainer'>
        <Container>
          <Segment.Group raised>
            <Segment>
              <Header as='h4' color='pink'>
                Your Bubbles
              </Header>
            </Segment>
            <Segment style={{ padding: '0em' }} vertical>
              <Grid celled='internally' columns='2'>
                <Grid.Row>
                  <Grid.Column width={5} style={{ padding: '1em 0em', backgroundColor: 'white' }}>
                  {this.getTutorialCards()}
                  </Grid.Column>
                  <Grid.Column>
                    col 2
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Segment.Group>
        </Container>
      </div>
    );
  }
}

export default Dashboard