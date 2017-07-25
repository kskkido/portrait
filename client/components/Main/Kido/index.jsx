import React, { Component } from 'react'
import styled from 'styled-components'

import { BodyContent, Flex1, MainContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
`


const Kido = ({ navigationList }) => (
  <MainContainer>
    <Navigation
      navigationList={navigationList}
      isCenter={true}
    />
  </MainContainer>
)

class LocalContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      navigationList: ['Welcome', 'To', 'My', 'Website']
    }
  }

  componentUnmount () {

  }

  render() {
    return (
      <Kido
        navigationList={this.state.navigationList}
      />
    )
  }
}

export default LocalContainer
