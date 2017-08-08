import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import Draggable from 'gsap/Draggable'
import { TweenMax } from 'gsap'

import { Slide } from '../Shared/Transition'
import { MainContainer } from '../Shared/Styles'
import { rotationChange, rotationRestart, viewRestart } from '../../reducers/events'

import Navigation from './Navigation'

/* ====== HIGHER LEVEL COMPONENT FOR ABOUT AND PROJECT ====== */
  /* ===== UNIQUE TRAITS =====
    navigationList
  */


const ContentView = ({ children, isCenter, inputBody, inputMain, inputNav, navigationList, onWheel, viewIndex, targetOffset }) => {
  return (
    <MainContainer innerRef={inputMain} onWheel={onWheel}>
      <div style={{maxHeight: '100px'}}>
        <Navigation
          navigationList={navigationList}
          isCenter={isCenter}
          getDom={inputNav}
        />
      </div>
      <TransitionGroup>
        <Slide key={viewIndex} targetOffset={targetOffset} exit={false}>
          <div ref={inputBody}>
            {children}
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
      direction: 'left',
      targetOffset: 50, //arbitrary
    }

    this.handleOnWheel = this.handleOnWheel.bind(this)
  }

  static nearest(ratio, callback) {
    return function (getRatio) {
      return function () {
        const { rotation } = this
            , targetRotation = getRatio ? Math.round(rotation / ratio) * ratio : rotation
        callback(targetRotation)
      }
    }
  }

  static tap (value, fn) {
    return (fn(value), value)
  }

  static slideDOM(bodyDOM) {
    return (targetOffset) => {
      TweenMax.to(bodyDOM, 0.7, {
        marginRight: `${targetOffset}px`
      })
    }
  }

  static slide(bodyDOM, mainDOM, length) {
    const ratio = (mainDOM.offsetWidth / 2) / (360 / length) // get the half of bodyDOM
        , getOffset = ((rat) => (rotation) => (rotation * rat))(ratio)
        , slideBodyDOM = LocalContainer.slideDOM(bodyDOM)
    let prevRotation = 0

    return (magnitude) => {
      prevRotation -= magnitude
      return LocalContainer.tap(getOffset(prevRotation), slideBodyDOM)
    }
  } // for gradual <slide></slide>

  static getRotation (wheelDelta, currentRotation) {
    return wheelDelta < 0 ? currentRotation + 1 : currentRotation - 1
  }

  static preventEvent (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  componentDidMount() {
    this.props.getNav && this.props.getNav(this.nav)

    const { length } = this.props.navigationList

    this.slideBody = LocalContainer.slide(this.body, this.mainDiv, length)
    this.getTargetRotation = LocalContainer.nearest(360 / length, this.props.rotationChange)

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
    this.setState(Object.assign({}, this.state, {targetOffset}))
  }

  shouldComponentUpdate({ viewIndex }) {
    return this.props.viewIndex !== viewIndex
  }

  componentDidUpdate() {
    this.slideBody = LocalContainer.slide(this.body, this.mainDiv, this.props.navigationList.length)
  }

  componentWillUnMount() {
    this.props.rotationRestart()
    this.props.viewRestart()
  }

  handleOnWheel ({nativeEvent}) {
    LocalContainer.preventEvent(nativeEvent)
    this.props.rotationChange(
      LocalContainer.getRotation(nativeEvent.wheelDelta || (-1 * nativeEvent.deltaY)
    , this.props.rotation))
  }

  render() {

    return (
      <ContentView // ABOUT OR PROJECT
        {...this.props}
        {...this.state}
        onWheel={this.handleOnWheel}
        inputBody={div => this.body = div}
        inputMain={div => this.mainDiv = div}
        inputNav={div => this.nav = div}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  rotation: state.events.rotation,
  viewIndex: state.events.viewIndex,
})

const mapDispatchToProps = (dispatch) => ({
  rotationChange: (rotation) => dispatch(rotationChange(rotation)),
  rotationRestart: () => dispatch(rotationRestart()),
  viewRestart: () => dispatch(viewRestart())
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
