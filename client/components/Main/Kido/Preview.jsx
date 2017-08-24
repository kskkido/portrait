import React, { Component } from 'react'
import Button from '../Button'
import { PreviewContainer } from '../../Shared/Styles'
import data from './content'


const ProjectsPreview = ({ viewIndex }) => {
  const { path, text } = data[viewIndex]

  return (
    <PreviewContainer>
      <p>{text}</p>
      {path && <Button path={path} />}
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

export default ProjectsPreview
