import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectPreview from './ProjectPreview'
import ProjectView from './ProjectView'
import { TransitionGroup } from 'react-transition-group'
import { Slide } from '../../Shared/Transition'
import BodyComponent from '../Body'
import { viewRestart, rotationRestart } from '../../../reducers/events'
import { viewData } from '../../Shared/Data'



const Project = ({ backgroundColor, isBody, navigationList }) => {
  return (
    <BodyComponent
      backgroundColor={backgroundColor}
      navigationList={navigationList}
      isCenter={!isBody}
    >
      {!isBody ?
        <ProjectPreview /> :
        <ProjectView />
      }
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
    return !this.props.isBody && (this.props.viewRestart(), this.props.rotationRestart())
  }

  render () {
    return (
      <Project
        isBody={this.props.isBody}
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
