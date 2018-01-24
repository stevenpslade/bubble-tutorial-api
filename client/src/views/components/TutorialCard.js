import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Header, Item, Icon, Label } from 'semantic-ui-react'

class TutorialCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Item>
        <Item.Content style={{ padding: '0em 1em' }}>
          <Item.Header as='a'>{this.props.title}</Item.Header>
          <Item.Extra>
            <Button basic floated='right' onClick={this.props.handleViewItems}>
              View
            </Button>
            <Label color='pink'><Icon name='comment' />{this.props.itemCount}</Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default TutorialCard