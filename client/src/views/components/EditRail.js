import React, { Component } from 'react'
import { Rail, Header, Icon } from 'semantic-ui-react'
require('../../style/components/editRail.css');

class EditRail extends Component {

  render() {
    let tutorial = this.props.tutorial;
    let tutorialItems = tutorial.tutorialItems;

    let railItems = [];
    for (let i = 0; i < tutorialItems.length; i++) {
      let item = tutorialItems[i];

      railItems.push(
        <Header key={item.id} color='pink' textAlign='right' onClick={ () => { this.props.goToEditItem(item.id) } }>
          {item.title}
        </Header>
      );
    }

    return (
      <Rail className='editRailContainer' dividing position='left'>
        <Header color='pink' textAlign='right' onClick={ () => { this.props.goToEditItem(tutorial.id, true) } }>
          {tutorial.name}
        </Header>
        {railItems}
        <Header color='pink' textAlign='right' onClick={ () => { this.props.goToEditItem(-1) } }>
            <Icon size='large' color='pink' name='add circle' />
        </Header>
      </Rail>
    );
  }
}

export default EditRail