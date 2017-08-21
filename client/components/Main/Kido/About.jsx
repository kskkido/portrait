import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from './Button'
import { Arrow } from '../../Shared/Assets'
import { WelcomeContainer } from '../../Shared/Styles'

const AboutPreview = () => {

  return (
    <WelcomeContainer>
      <p>Learn about me?</p>
      <Button path="/about" />
    </WelcomeContainer>
  )
}

class LocalContainer extends Component {

  render() {

    return (
      <AboutPreview />
    )
  }
}

export default LocalContainer
