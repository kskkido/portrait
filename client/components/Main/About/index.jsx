import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'

import { Slide } from '../../Shared/Transition'
import { MainContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'
import AboutView1 from './AboutView1'
import AboutView2 from './AboutView2'
import AboutView3 from './AboutView3'
import AboutView4 from './AboutView4'

import { rotationChange } from '../../../reducers/events'

const renderCurrentView = (currentView, language) => {
  if (currentView === 'Who') {
    return <AboutView1 language={language} />
  } else if (currentView === 'What') {
    return <AboutView2 language={language} />
  } else if (currentView === 'Where') {
    return <AboutView3 language={language} />
  } else if (currentView === 'Why') {
    return <AboutView4 language={language} />
  }
}


const Home = ({ currentIndex, direction, language, navigationList }) => {
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
          {renderCurrentView(currentView, language)}
        </Slide>
      </TransitionGroup>
    </MainContainer>
  )
}

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationList: ['Who', 'What', 'Where', 'Why'], // shouldn't be in state, doesn't change
      currentIndex: 0,
      direction: 'left'
    }
  }

  static getDirection(prevIndex, nextIndex) {
    return nextIndex > prevIndex ? 'right' : 'left'
  }

  componentDidMount() {
    // params doesnt hit here, but does with transition group
    // const { params: { index }} = this.props.match
  }

  componentWillReceiveProps({viewIndex}) {
    const direction = LocalContainer.getDirection(this.state.currentIndex, viewIndex)
    this.setState(Object.assign({}, ...this.state, {currentIndex: viewIndex, direction}))
  }

  render() {
    const { currentIndex, navigationList } = this.state

    return (
      <Home
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
