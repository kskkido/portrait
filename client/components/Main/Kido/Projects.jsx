import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { Arrow } from '../../Shared/Assets'
import { WelcomeContainer } from '../../Shared/Styles'


const ProjectsPreview = () => {

  return (
    <WelcomeContainer>
      <p>Take a look at my projects</p>
      <Button path="/projects" />
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
