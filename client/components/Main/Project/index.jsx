import React, { Component } from 'react'
import { connect } from 'react-redux'
import Preview from './ProjectPreview'
import Content from './ProjectView'
import { TransitionGroup } from 'react-transition-group'
import { Slide } from '../../Shared/Transition'
import BodyComponent from '../Body'
import { pathChange, viewRestart, rotationRestart } from '../../../reducers/events'
import { viewData } from '../../Shared/Data'



const Project = ({ backgroundColor, isBody, navigationList }) => {
  return (
    <BodyComponent
      backgroundColor={backgroundColor}
      navigationList={navigationList}
      isCenter={!isBody}
    >
      {isBody ?
        <Content /> :
        <Preview />
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
    this.isBody = this.props.location.state && this.props.location.state.isBody
    return !this.isBody && (this.props.pathChange(2), this.props.viewRestart(), this.props.rotationRestart())
  }

  render () {
    return (
      <Project
        backgroundColor={LocalContainer.backgroundColor}
        navigationList={LocalContainer.navigationList}
        isBody={this.isBody}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  pathChange: (index) => dispatch(pathChange(index)),
  viewRestart: () => dispatch(viewRestart()),
  rotationRestart: () => dispatch(rotationRestart())
})

export default connect(null, mapDispatchToProps)(LocalContainer)
