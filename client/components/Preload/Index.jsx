import React, { Component } from 'react'
import styled from 'styled-components'

import { Flex1 } from '../Main/Shared/Styles'
import LanguageQuery from './Language'

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Preload = () => (
  <FlexContainer>
      <LanguageQuery />
  </FlexContainer>
)

export default Preload
