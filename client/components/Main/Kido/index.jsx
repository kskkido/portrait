import React, { Component } from 'react'
import { TransitionGroup } from 'react-transition-group';
import styled from 'styled-components'

import { SlideTransition } from '../../Shared/Transition'
import { MainContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'

const Kido = ({ navigationList }) => (
  <MainContainer>
    <TransitionGroup>
      <SlideTransition key="kido" enter={false} direction="up">
        <Navigation
          navigationList={navigationList}
          isCenter={true}
        />
      </SlideTransition>
    </TransitionGroup>
  </MainContainer>
)

class LocalContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navigationList: ['Welcome', 'To', 'My', 'Website'],
    }
  }

  render() {
    return (
      <Kido
        inProp={this.state.in}
        navigationList={this.state.navigationList}
      />
    )
  }
}

export default LocalContainer
