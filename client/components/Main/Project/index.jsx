import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectView from './ProjectView'
import { TransitionGroup } from 'react-transition-group'
import { Slide } from '../../Shared/Transition'
import BodyComponent from '../Body'
import { viewRestart, rotationRestart } from '../../../reducers/events'
import { viewData } from '../../Shared/Data'

const Project = ({ backgroundColor, navigationList }) => {
  return (
    <BodyComponent
      backgroundColor={backgroundColor}
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

  static get backgroundColor () {
    return viewData.projects.backgroundColor
  }

  componentWillMount() {
    this.props.rotationRestart(); this.props.viewRestart();
  }

  render () {

    return (
      <Project
        backgroundColor={LocalContainer.backgroundColor}
        navigationList={LocalContainer.navigationList}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  viewRestart: () => dispatch(viewRestart()),
  rotationRestart: () => dispatch(rotationRestart())
})

export default connect(null, mapDispatchToProps)(LocalContainer)
