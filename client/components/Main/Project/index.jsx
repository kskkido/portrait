import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'

import { Slide } from '../../Shared/Transition'
import { MainContainer, BodyContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'
import ProjectView from './ProjectView'

const Project = ({ currentView, direction, language, navigationList }) => (
  <MainContainer>
    <div style={{maxHeight: '100px'}}>
      <Navigation
        navigationList={navigationList}
      />
    </div>
    <TransitionGroup>
      <Slide key={currentView} direction={direction} exit={false}>
        <ProjectView currentView={currentView} language={language}/>
      </Slide>
    </TransitionGroup>
  </MainContainer>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationList: ['AUDIOSPHERE', 'STACKQUEST', 'PORTFOLIO'],
      currentIndex: this.props.viewIndex,
      direction: 'right'
    }
  }


  static getDirection(prevIndex, nextIndex) {
    const dif = prevIndex - nextIndex
    return dif < 0 || (nextIndex === 0 && prevIndex !== 1) ? 'right' : 'left'
  }

  componentWillReceiveProps({viewIndex}) {
    const direction = LocalContainer.getDirection(this.state.currentIndex, viewIndex)
    this.setState(Object.assign({}, ...this.state, {currentIndex: viewIndex, direction}))
  }

  render() {
    const { navigationList } = this.state

    return (
      <Project
        currentView={navigationList[this.props.viewIndex]}
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

export default connect(mapStateToProps)(LocalContainer)
