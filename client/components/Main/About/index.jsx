import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import Draggable from 'gsap/Draggable'
import { TweenMax } from 'gsap'

import { Slide } from '../../Shared/Transition'
import { MainContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'
import AboutView1 from './AboutView1'
import AboutView2 from './AboutView2'
import AboutView3 from './AboutView3'
import AboutView4 from './AboutView4'

import { rotationChange, viewChange } from '../../../reducers/events'

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


const Home = ({ currentIndex, direction, inputMain, inputNav, language, navigationList }) => {
  const currentView = navigationList[currentIndex]

  return (
    <MainContainer innerRef={inputMain}>
      <div style={{maxHeight: '100px'}}>
        <Navigation
          navigationList={navigationList}
          currentIndex={currentIndex}
          getDom={inputNav}
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

  static defineDirectionMethod(length) {
    return (prevIndex, nextIndex) => {
     return nextIndex > prevIndex || (nextIndex === 0 && prevIndex === length) ? 'right' : 'left'
    }
  }

  static nearest(fn, ratio) {
    return function () {
      const { rotation, target } = this
          , targetRotation = Math.round(rotation / ratio) * ratio
      TweenMax.to(target, 0.3, {rotation: targetRotation, onComplete: fn, onCompleteParams: [targetRotation]})
    }
  }

  componentDidMount() {
    const { length } = this.state.navigationList

    this.getDirection = LocalContainer.defineDirectionMethod(length - 1)
    this.getNearestRatio = LocalContainer.nearest(this.props.rotationChange, 360 / length)

    // DEFINE DRAGGABLE
    Draggable.create(this.nav, {
      type: 'rotation',
      trigger: this.mainDiv,
      onDragEnd: this.getNearestRatio,
    })
  }


  componentWillReceiveProps({viewIndex}) {
    const direction = this.getDirection(this.state.currentIndex, viewIndex)
    this.setState(Object.assign({}, ...this.state, {currentIndex: viewIndex, direction}))
  }

  render() {
    const { currentIndex, navigationList } = this.state

    return (
      <Home
        currentIndex = {currentIndex}
        direction={this.state.direction}
        inputMain={div => this.mainDiv = div}
        inputNav={div => this.nav = div}
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
  rotationChange: (rotation) => dispatch(rotationChange(rotation)),
  viewChange: (index) => dispatch(viewChange(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
