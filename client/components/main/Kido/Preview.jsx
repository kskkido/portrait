import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { PreviewContainer } from '../../shared/Styles'
import data from './content'

import Button from '../shared/Button'

const ProjectsPreview = ({ history, viewIndex }) => {
   if (!data[viewIndex]) return <div />

  const { path, text } = data[viewIndex]

  return (
    <PreviewContainer>
      <p>{text}</p>
      {path && <Button onClick={() => history.push(path)} />}
    </PreviewContainer>
  )
}

export default withRouter(ProjectsPreview)
