import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '../Button'
import { PreviewContainer } from '../../shared/Styles'
import data from './content'

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

class LocalContainer extends Component {

  render() {

    return (
      <ProjectsPreview />
    )
  }
}

export default withRouter(ProjectsPreview)
