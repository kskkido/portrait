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

import { rotationChange } from '../../../reducers/events'

const renderCurrentView = (viewIndex, language) => {
  if (viewIndex === 0) {
    return <AboutView1 key="one" language={language} />
  } else if (viewIndex === 1) {
    return <AboutView2 language={language} />
  } else if (viewIndex === 2) {
    return <AboutView3 language={language} />
  } else if (viewIndex === 3) {
    return <AboutView4 language={language} />
  }
}


const About = ({ direction, inputBody, inputMain, inputNav, language, navigationList, targetOffset, viewIndex }) => {
  const currentView = navigationList[viewIndex]

  return (
    <MainContainer innerRef={inputMain}>
      <div style={{maxHeight: '100px'}}>
        <Navigation
          navigationList={navigationList}
          currentIndex={viewIndex}
          getDom={inputNav}
        />
      </div>
      <TransitionGroup>
        <Slide key={viewIndex} targetOffset={targetOffset} exit={false}>
          <div ref={inputBody}>
            {renderCurrentView(viewIndex, language)}
          </div>
        </Slide>
      </TransitionGroup>
    </MainContainer>
  )
}

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navigationList: ['Who', 'What', 'Where', 'When'], // shouldn't be in state, doesn't change
      direction: 'left',
      targetOffset: 20, //arbitrary
    }
  }

  static getDirection(magnitude) {
    return magnitude > 0 ? 'left' : 'right'
  }

  static nearest(fn, ratio) {
    return function (isRatio) {
      return function () {
        const { rotation } = this
            , targetRotation = isRatio ? Math.round(rotation / ratio) * ratio : rotation
        fn && fn(targetRotation)
      }
    }
  }

  static slide(targetDOM, length) {
    const ratio = (targetDOM.offsetWidth / 2) / (360 / length) // get the half of targetdom
        , getOffset = ((rat) => (rotation) => (rotation * rat))(ratio)
    let prevRotation = 0

    return (magnitude) => {
      const targetOffset = getOffset(prevRotation -= magnitude)

      TweenMax.to(targetDOM, 0.7, {
        marginRight: `${targetOffset}px`
      }) // separate this

      return targetOffset
    }
  } // for gradual slide

  componentDidMount() {
    const { length } = this.state.navigationList

    this.slideBody = LocalContainer.slide(this.body, length)
    this.getTargetRotation = LocalContainer.nearest(this.props.rotationChange, 360 / length)

    // DEFINE DRAGGABLE
    Draggable.create(this.nav, {
      type: 'rotation',
      trigger: this.mainDiv,
      onDrag: this.getTargetRotation(false),
      onDragEnd: this.getTargetRotation(true),
    })
  }

  componentWillReceiveProps({ rotation }) {
    const magnitude = this.props.rotation - rotation
        , targetOffset = this.slideBody(magnitude) // get magnitude
        , direction = LocalContainer.getDirection(magnitude)
    this.setState(Object.assign({}, this.state, {direction, targetOffset}))
  }

  shouldComponentUpdate({ viewIndex }) {
    return this.props.viewIndex !== viewIndex
  }

  componentDidUpdate() {
    // reassign slideBody with new props index
    this.slideBody = LocalContainer.slide(this.body, this.state.navigationList.length, this.props.viewIndex)
  }

  render() {
    console.log(this.handleKeyDown)
    return (
      <About
        {...this.props}
        {...this.state}
        inputBody={div => this.body = div}
        inputMain={div => this.mainDiv = div}
        inputNav={div => this.nav = div}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  language: state.language.language,
  rotation: state.events.rotation,
  viewIndex: state.events.viewIndex
})

const mapDispatchToProps = (dispatch) => ({
  rotationChange: (rotation) => dispatch(rotationChange(rotation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
