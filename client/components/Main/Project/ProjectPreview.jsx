import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../Button'
import { PreviewContainer } from '../../Shared/Styles'
import data from './content'

const ProjectPreview = ({ viewIndex }) => {
  const { preview } = data[viewIndex]
      , location = {
          pathname: '/projects',
          state: {isBody: true}
        }
  return (
    <PreviewContainer>
      <p>{preview}</p>
      <Button path={location} />
    </PreviewContainer>
  )
}

export default ProjectPreview
