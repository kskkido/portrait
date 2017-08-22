import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../Button'
import { WelcomeContainer } from '../../Shared/Styles'
import data from './content'

const ProjectPreview = ({ viewIndex }) => {
  const { preview } = data[viewIndex]
      , location = {
          pathname: '/projects',
          state: {isBody: true}
        }
  return (
    <WelcomeContainer>
      <p>{preview}</p>
      <Button path={location} />
    </WelcomeContainer>
  )
}

export default ProjectPreview
