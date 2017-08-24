import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '../Button'
import { PreviewContainer } from '../../Shared/Styles'
import data from './content'

const ProjectsPreview = ({ history, viewIndex }) => {
  const { path, text } = data[viewIndex]

  return (
    <PreviewContainer>
      <p>{text}</p>
      {path && <Button onClick={() => history.push(path)} />}
    </PreviewContainer>
  )
}

class LocalContainer extends Component {

  render() {

    return (
      <ProjectsPreview />
    )
  }
}

export default withRouter(ProjectsPreview)
