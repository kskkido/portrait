import React, { Component } from 'react'
import { connect } from 'react-redux'
import BodyComponent from '../Body'
import Content from './ContentView'
import Preview from './Preview'
import { pathChange, viewRestart, rotationRestart } from '../../../reducers/events'
import { viewData } from '../../shared/Data'
import { BodyFade } from '../../shared/Transition'
import { TransitionGroup } from 'react-transition-group'

const About = ({ isBody, toggleBody, backgroundColor, navigationList }) => {
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
    return viewData.about.navigationList
  }

  static get backgroundColor () {
    return viewData.about.backgroundColor
  }

  componentWillMount() {
    this.props.pathChange(1)
    // this.isBody = this.props.location.state && this.props.location.state.isBody
    // return !this.isBody && (this.props.pathChange(1), this.props.viewRestart(), this.props.rotationRestart())
  }

  toggleBody() {
    this.setState(Object.assign({}, {isBody: true}))
  }

  render () {
    const { isBody } = this.state

    return (
      <TransitionGroup>
        <BodyFade key={isBody}>
          <About
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
