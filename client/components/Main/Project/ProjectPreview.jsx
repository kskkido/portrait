import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../../Shared/Button'
import { WelcomeContainer } from '../../Shared/Styles'
import data from './content'

const ProjectPreview = ({ viewIndex }) => {
  const { preview } = data[viewIndex]

  return (
    <WelcomeContainer>
      <p>{preview}</p>
      <Button path="/project/:body" />
    </WelcomeContainer>
  )
}

export default ProjectPreview
