import React, { Component } from 'react'
import { TransitionGroup } from 'react-transition-group'

import { SlideOut } from '../../Shared/Transition'
import { MainContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'

const Kido = ({ inputRef, navigationList }) => (
  <MainContainer>
      <Navigation
        navigationList={navigationList}
        isCenter={true}
        getDom={(component) => inputRef(component)}
      />
  </MainContainer>
)

class LocalContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navigationList: ['Welcome', 'To', 'My', 'Website'],
    }
  }

  componentWillUnmount() {
    console.log(this.nav, 'wut')
  }

  render() {
    return (
      <Kido
        inProp={this.state.in}
        navigationList={this.state.navigationList}
        inputRef={ref => this.nav=ref}
      />
    )
  }
}

export default LocalContainer
