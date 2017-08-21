import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from './Button'
import { WelcomeContainer } from '../../Shared/Styles'

const ContactsPreview = () => {

  return (
    <WelcomeContainer>
      <p>Lets get in touch!</p>
      <Button path="/contact" />
    </WelcomeContainer>
  )
}

class LocalContainer extends Component {

  render() {

    return (
      <ContactsPreview />
    )
  }
}

export default LocalContainer
