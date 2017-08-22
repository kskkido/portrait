import React, { Component } from 'react'
import Button from '../../Shared/Button'
import { WelcomeContainer } from '../../Shared/Styles'
import data from './content'

const AboutPreview = ({ viewIndex }) => {
  const { preview } = data[viewIndex]
      , location = {
          pathname: '/about',
          state: {isBody: true}
        }
  return (
    <WelcomeContainer>
      <p>{preview}</p>
      <Button path={location} />
    </WelcomeContainer>
  )
}

export default AboutPreview

