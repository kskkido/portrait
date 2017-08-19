import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { TransitionGroup } from 'react-transition-group'
import { fadeIn } from '../Shared/Styles'
import { Fade } from  '../Shared/Transition'
import LanguageQuery from './Language'
import Load from './Load'


const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
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
