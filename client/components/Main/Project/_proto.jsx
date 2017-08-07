import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectView from './ProjectView'
import { TransitionGroup } from 'react-transition-group'
import { Slide } from '../../Shared/Transition'
import BodyComponent from '../_proto'

import { viewData } from '../../Shared/Data'

const Project = ({ navigationList }) => {
  return (
    <BodyComponent
      navigationList={navigationList}
    >
      <ProjectView
      />
    </BodyComponent>
  )
}

class LocalContainer extends Component {
  static get navigationList () {
    return viewData.projects.navigationList
  }

  render () {

    return (
      <Project
        navigationList={LocalContainer.navigationList}
      />
    )
  }
}


export default LocalContainer
