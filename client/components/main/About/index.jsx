import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import { pathChange, viewRestart, rotationRestart } from '../../../reducers/events'
import { BodyFade } from '../../shared/Transition'
import { viewData } from '../../shared/Data'

import BodyComponent from '../Body'
import Content from './ContentView'
import Preview from './Preview'
import Return from '../Return'


const About = ({ isBody, toggleBody, backgroundColor, navigationList }) => {
  return (
    <TransitionGroup>
      <BodyFade key={isBody}>
      <div>
        {!isBody && <Return />}
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
    return viewData.about.navigationList
  }

  static get backgroundColor () {
    return viewData.about.backgroundColor
  }

  componentWillMount() {
    this.props.pathChange(1)
  }

  toggleBody() {
    this.setState(Object.assign({}, {isBody: !this.state.isBody}))
  }

  render () {
    const { isBody } = this.state

    return (
      <About
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
