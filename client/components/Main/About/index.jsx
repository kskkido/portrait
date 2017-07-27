import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'

import { FadeTransition, SlideTransition } from '../../Shared/Transition'
import { MainContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'
import AboutView1 from './AboutView1'
import AboutView2 from './AboutView2'
import AboutView3 from './AboutView3'
import AboutView4 from './AboutView4'

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


const Home = ({ currentView, direction, language, navigationList }) => (
  <MainContainer>
    <div style={{maxHeight: '100px'}}>
      <Navigation
        navigationList={navigationList}
      />
    </div>
    <TransitionGroup>
      <SlideTransition key={currentView} direction={direction} exit={false}>
        {renderCurrentView(currentView, language)}
      </SlideTransition>
    </TransitionGroup>
  </MainContainer>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationList: ['Who', 'What', 'Where', 'Why'],
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
    console.log(direction)
    this.setState(Object.assign({}, ...this.state, {currentIndex: viewIndex, direction}))
  }

  render() {
    const { navigationList } = this.state

    return (
      <Home
        currentView={navigationList[this.props.viewIndex]}
        direction={this.state.direction}
        navigationList={navigationList}
        language={this.props.language}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.language.language,
  viewIndex: state.events.viewIndex
})

export default connect(mapStateToProps)(LocalContainer)
