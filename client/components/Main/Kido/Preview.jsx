import React, { Component } from 'react'
import Button from '../Button'
import { WelcomeContainer } from '../../Shared/Styles'
import data from './content'


const ProjectsPreview = ({ viewIndex }) => {
  const { path, text } = data[viewIndex]

  return (
    <WelcomeContainer>
      <p>{text}</p>
      {path && <Button path={path} />}
    </WelcomeContainer>
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
