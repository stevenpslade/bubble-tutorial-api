import React, { Component } from 'react'
import { Button, Item, Icon, Label } from 'semantic-ui-react'

class TutorialCard extends Component {

  render() {
    if (this.props.item) {
      return (
        <Item>
          <Item.Content style={{ padding: '0em 1em' }}>
            <Item.Header>
              {this.props.title}
            </Item.Header>
            <Item.Description>
              <p>
                {this.props.content}
              </p>
            </Item.Description>
          </Item.Content>
        </Item>
      );
    } else {
      return (
        <Item className={this.props.active ? 'active' : ''}>
          <Item.Content style={{ padding: '0em 1em' }}>
            <Item.Header as='a'>{this.props.title}</Item.Header>
            <Item.Extra>
              <Button basic floated='right' onClick={ () => { this.props.handleViewItems(this.props.id) } }>
                View
              </Button>
              <Label color='pink'><Icon name='comment' />{this.props.itemCount}</Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      );
    }
  }
}

export default TutorialCard