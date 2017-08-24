import React, { Component } from 'react'
import { connect } from 'react-redux'
import Preview from './ProjectPreview'
import Content from './ProjectView'
import { TransitionGroup } from 'react-transition-group'
import { BodyFade } from '../../Shared/Transition'
import BodyComponent from '../Body'
import { pathChange, viewRestart, rotationRestart } from '../../../reducers/events'
import { viewData } from '../../Shared/Data'

const Project = ({ isBody, toggleBody, backgroundColor, navigationList }) => {
  return (
      <BodyComponent
        backgroundColor={backgroundColor}
        navigationList={navigationList}
        isBody={isBody}
      >
        {isBody ?
          <Content navigationList={navigationList} /> :
          <Preview toggleBody={toggleBody} />
        }
      </BodyComponent>
  )
}

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isBody: false
    }

    this.toggleBody = this.toggleBody.bind(this)
  }

  static get navigationList () {
    return viewData.projects.navigationList
  }

  static get backgroundColor () {
    return viewData.projects.backgroundColor
  }

  componentWillMount() {
    this.props.pathChange(2)
    // this.isBody = this.props.location.state && this.props.location.state.isBody
    // return !this.isBody && (this.props.pathChange(1), this.props.viewRestart(), this.props.rotationRestart())
  }

  componentWillUnmount() {
    this.props.viewRestart(); this.props.rotationRestart()
  }

  toggleBody() {
    this.setState(Object.assign({}, {isBody: true}))
  }

  render () {
    const { isBody } = this.state

    return (
      <TransitionGroup>
        <BodyFade key={isBody}>
          <Project
            isBody={isBody}
            toggleBody={this.toggleBody}
            backgroundColor={LocalContainer.backgroundColor}
            navigationList={LocalContainer.navigationList}
          />
        </BodyFade>
      </TransitionGroup>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  pathChange: (index) => dispatch(pathChange(index)),
  viewRestart: () => dispatch(viewRestart()),
  rotationRestart: () => dispatch(rotationRestart())
})

export default connect(null, mapDispatchToProps)(LocalContainer)
