import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Item, Icon, Label, Popup } from 'semantic-ui-react'

class TutorialCard extends Component {

  render() {
    if (this.props.item) {
      return (
        <Item>
          <Item.Content style={{ padding: '0em 1em' }}>
            <Item.Header>
              {this.props.title} <Label size='small'>{this.props.cssSelector}</Label>
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
      let actionIcons = null;

      if (this.props.active) {
        actionIcons = (
          <div>
            <Popup
              trigger={<Icon link onClick={ () => { this.props.handleDeleteTutorial(this.props.id) } } name='trash' color='red' style={{ float: 'right' }} />}
              content="This will delete the stream & it's bubbles forever."
              inverted
              position='right center'
              size='small'
            />
            <Link to={'/bubbles/' + this.props.id + '/edit'}><Icon name='pencil' color='grey' style={{ float: 'right' }} /></Link>
          </div>
        );
      }

      return (
        <Item className={this.props.active ? 'active' : ''}>
          <Item.Content style={{ padding: '0em 1em' }}>
            {actionIcons}
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