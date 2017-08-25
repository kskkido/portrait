import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../Button'
import { PreviewContainer } from '../../shared/Styles'
import data from './content'

const ProjectPreview = ({ toggleBody, viewIndex }) => {
  if (data[viewIndex] === undefined) return <div />

  const { preview } = data[viewIndex]
      , location = {
          pathname: '/projects',
          state: {isBody: true}
        }
  return (
    <PreviewContainer>
      <p>{preview}</p>
      <Button onClick={toggleBody} />
    </PreviewContainer>
  )
}

export default ProjectPreview