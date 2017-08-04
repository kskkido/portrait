import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { fadeIn } from '../Shared/Styles'
import LanguageQuery from './Language'
import Load from './Load'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items; center;
  min-height: 100vh;
  animation: ${fadeIn} 0.5s ease-in-out 0s;
`

const Preload = ({ selected }) => (
  <Container>
    {!selected ?
      <LanguageQuery /> :
      <Load />
    }
  </Container>
)

export default connect(({language}) => ({selected: language.selected}))(Preload)
