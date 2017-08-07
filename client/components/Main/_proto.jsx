import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import Draggable from 'gsap/Draggable'
import { TweenMax } from 'gsap'

import { Slide } from '../Shared/Transition'
import { MainContainer } from '../Shared/Styles'
import { rotationChange, rotationRestart, viewRestart } from '../../reducers/events'

import About from './About/_proto'
import Project from './Project/_proto'
import Navigation from './Navigation'

/* ====== HIGHER LEVEL COMPONENT FOR ABOUT AND PROJECT ====== */
  /* ===== UNIQUE TRAITS =====
    navigationList
  */


const ContentView = ({ children, inputBody, inputMain, inputNav, language, navigationList, onWheel, viewIndex, targetOffset }) => {
  return (
    <MainContainer innerRef={inputMain} onWheel={onWheel}>
      <div style={{maxHeight: '100px'}}>
        <Navigation
          navigationList={navigationList}
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
        callback && callback(targetRotation)
      }
    }
  }

  static slide(bodyDOM, mainDOM, length) {
    const ratio = (mainDOM.offsetWidth / 2) / (360 / length) // get the half of bodyDOM
        , getOffset = ((rat) => (rotation) => (rotation * rat))(ratio)
    let prevRotation = 0
    console.log(mainDOM.offsetWidth, 'IN SLIDEBODY')

    return (magnitude) => {
      const targetOffset = getOffset(prevRotation -= magnitude)
      TweenMax.to(bodyDOM, 0.7, {
        marginRight: `${targetOffset}px`
      }) // separate this
      return targetOffset
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
    console.log('UPDATE', this.body)
    this.slideBody = LocalContainer.slide(this.body, this.mainDiv, this.props.navigationList.length)
  }

  componentWillUnMount() {
    console.log('UNMOUNT')
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
