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
      tutorialData: TutorialStore.getTutorialData(),
      selectedTutorial: null
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

  selectTutorial(itemId) {
    this.setState({
      selectedTutorial: TutorialStore.getTutorialData(itemId)
    });
  }

  getTutorialCards() {
    let tutorialList = [];

    if (this.state.tutorialData) {
      let tutorialData = this.state.tutorialData;

      for (let i = 0; i < tutorialData.length; i++) {
        let tutorial = tutorialData[i];
        //let tutorialLink = '/bubbles/' + tutorial.id;
        tutorialList.push(<TutorialCard key={tutorial.id} id={tutorial.id} title={tutorial.name} itemCount={tutorial.tutorialItems.length} handleViewItems={this.selectTutorial.bind(this)} />);
      }
    }

    return (
      <Item.Group divided className='tutorialList'>
        {tutorialList}
      </Item.Group>
    );
  }

  getTutorialItemsView() {
    let tutorialItems = [];
    let itemsHeader = null;

    if (this.state.selectedTutorial) {
      itemsHeader = (
          <Segment attached style={{ borderTop: 'none', backgroundColor: '#f7f7f7' }}>
            <Header as='h5' color='pink'>
              Bubbles
            </Header>
          </Segment>
        );

      let selectedTutorialItems = this.state.selectedTutorial.tutorialItems;

      for (let i = 0; i < selectedTutorialItems.length; i++) {
        let item = selectedTutorialItems[i];

        tutorialItems.push(<TutorialCard item key={item.id} id={item.id} title={item.title} content={item.content} />);
      }
    }

    return (
      <Grid.Column width={11} style={{ padding: '0em 0em 1em 0em', backgroundColor: 'white' }}>
        {itemsHeader}
        <Item.Group divided>
          {tutorialItems}
        </Item.Group>
      </Grid.Column>
    );
  }

  render() {
    let scriptCode = `<script id="bubbleScript" site_id="${this.state.siteId}" src="https://www.stevenpslade.com/tutorial.js"></script>`;

    return (
      <div className='dashboardContainer'>
        <Container>
          <Segment.Group raised>
            <Segment>
              <Header as='h4' color='pink'>
                Your Streams
              </Header>
            </Segment>
            <Segment style={{ padding: '0em' }}>
              <Grid celled='internally' columns='2' style={{ minHeight: '35em' }}>
                <Grid.Row>
                  <Grid.Column width={5} style={{ padding: '0em 0em 1em 0em', backgroundColor: 'white' }}>
                  {this.getTutorialCards()}
                  </Grid.Column>
                  {this.getTutorialItemsView()}
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