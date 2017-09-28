import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import { pathChange, viewRestart, rotationRestart } from '../../../reducers/events'
import { BodyFade } from '../../shared/Transition'
import { viewData } from '../../shared/Data'

import BodyComponent from '../Body'
import Content from './ContentView'
import Preview from './Preview'
import Return from '../shared/Return'

const Project = ({ isBody, toggleBody, backgroundColor, navigationList }) => {
  return (
    <TransitionGroup>
      <BodyFade key={isBody}>
        <div>
          {!isBody && <Return hide={true}/>}
          <BodyComponent
            backgroundColor={backgroundColor}
            navigationList={navigationList}
            isBody={isBody}
          >
            {isBody ?
              <Content navigationList={navigationList} toggleBody={toggleBody} /> :
              <Preview toggleBody={toggleBody} />
            }
          </BodyComponent>
        </div>
      </BodyFade>
    </TransitionGroup>
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

  toggleBody() {
    this.setState(({isBody}) => ({isBody: !isBody}))
  }

  render () {
    const { isBody } = this.state

    return (
      <Project
        isBody={isBody}
        toggleBody={this.toggleBody}
        backgroundColor={LocalContainer.backgroundColor}
        navigationList={LocalContainer.navigationList}
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
