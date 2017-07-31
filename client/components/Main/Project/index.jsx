import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'

import { Slide } from '../../Shared/Transition'
import { MainContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'
import ProjectView from './ProjectView'

import { rotationChange } from '../../../reducers/events'

const Project = ({ currentIndex, direction, language, navigationList }) => {
  const currentView = navigationList[currentIndex]

  return (
    <MainContainer>
      <div style={{maxHeight: '100px'}}>
        <Navigation
          navigationList={navigationList}
          currentIndex={currentIndex}
        />
      </div>
      <TransitionGroup>
        <Slide key={currentView} direction={direction} exit={false}>
          <ProjectView currentView={currentView} language={language} />
        </Slide>
      </TransitionGroup>
    </MainContainer>
  )
}

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationList: ['AUDIOSPHERE', 'STACKQUEST', 'PORTFOLIO'],
      currentIndex: 0,
      direction: 'right'
    }
  }


  static getDirection(prevIndex, nextIndex) {
    const dif = prevIndex - nextIndex
    return dif < 0 || (nextIndex === 0 && prevIndex !== 1) ? 'right' : 'left'
  }

  static setRotation (index, length) {
    return (1 / length) * index + 1
  }

  componentWillReceiveProps({viewIndex}) {
    const direction = LocalContainer.getDirection(this.state.currentIndex, viewIndex)
    this.setState(Object.assign({}, ...this.state, {currentIndex: viewIndex, direction}))
  }

  render() {
    const { currentIndex, navigationList } = this.state

    return (
      <Project
        currentIndex = {currentIndex}
        direction={this.state.direction}
        language={this.props.language}
        navigationList={navigationList}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.language.language,
  viewIndex: state.events.viewIndex
})

const mapDispatchToProps = (dispatch) => ({
  rotationChange: (rotation) => dispatch(rotationChange(rotation))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
