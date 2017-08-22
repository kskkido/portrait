import React, { Component } from 'react'
import { connect } from 'react-redux'
import BodyComponent from '../Body'
import Content from './AboutView'
import Preview from './Preview'
import { pathChange, viewRestart, rotationRestart } from '../../../reducers/events'
import { viewData } from '../../Shared/Data'

const About = ({ backgroundColor, navigationList, isBody }) => {
  return (
    <BodyComponent
      backgroundColor={backgroundColor}
      navigationList={navigationList}
      isCenter={!isBody}
    >
          {isBody ?
            <Content navigationList={navigationList} /> :
            <Preview />
          }
    </BodyComponent>
  )
}

class LocalContainer extends Component {
  static get navigationList () {
    return viewData.about.navigationList
  }

  static get backgroundColor () {
    return viewData.about.backgroundColor
  }

  componentWillMount() {
    this.isBody = this.props.location.state && this.props.location.state.isBody
    return !this.isBody && (this.props.pathChange(1), this.props.viewRestart(), this.props.rotationRestart())
  }

  render () {
    return (
      <About
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
