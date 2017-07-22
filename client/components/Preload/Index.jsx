import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Flex1 } from '../Main/Shared/Styles'
import LanguageQuery from './Language'
import Load from './Load'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items; center;
  border: 1px solid;
  min-height: 100vh;
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
