import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import Draggable from 'gsap/Draggable'
import { TweenLite, Back } from 'gsap'
import { withRouter } from 'react-router-dom'
import { Slide } from '../shared/Transition'
import { rotationChange, rotationRestart, viewChange, viewRestart } from '../../reducers/events'
import styled from 'styled-components'
import Navigation from './Navigation'

/* ====== HIGHER LEVEL COMPONENT FOR ABOUT AND PROJECT ====== */
  /* ===== UNIQUE TRAITS =====
    navigationList
  */

const MainContainer = styled.div`
  display: inline-block;
  height: 100%;
  width: 100%;
  cursor: move;
  position: absolute;
  top: ${props => props.isBody ? '-220px' : '200px'};
  left: 0;
  right: 0;
  z-index: 100
`

const Body = styled.div`
  position: relative;
  top: 75px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

const ContentView = ({ backgroundColor, children, isBody, inputBody, inputMain, inputNav, navigationList, rotation, viewIndex, targetOffset }) => {

  return (
    <MainContainer
      innerRef={inputMain}
      isBody={isBody}
    >
      <Navigation
        navigationList={navigationList}
        getDom={inputNav}
        rotation={rotation}
      />
      <TransitionGroup>
        <Slide
          key={viewIndex}
          color={backgroundColor[viewIndex]}
          targetOffset={targetOffset}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <Body
            innerRef={inputBody}
          >
            {children && React.cloneElement(children, {viewIndex})}
           </Body>
        </Slide>
      </TransitionGroup>
    </MainContainer>
  )
}


class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      TweenLite.to(bodyDOM, 0.7, {
        left: `${-targetOffset}px`,
        ease: Back.easeOut
      })
    }
  }

  static round (length) {
    return (rotation) => {
      const rounded = rotation / (360 / length)
      return rounded < 0 ? (Math.ceil(-(rounded) / length) * length) + rounded : rounded % length
    }
  }

  static slide(bodyDOM, mainDOM, length) {
    const ratio = (mainDOM.offsetWidth / 2) / (360 / length) // get the half of bodyDOM
        , getOffset = ((rat) => (rotation) => ((rotation * rat) * 0.5))(ratio)
        , slideBodyDOM = LocalContainer.slideDOM(bodyDOM)
    let prevRotation = 0

    return (magnitude) => {
      prevRotation -= magnitude
      return LocalContainer.tap(getOffset(prevRotation), slideBodyDOM)
    }
  }

  static getRotation (wheelDelta, currentRotation) {
    return wheelDelta < 0 ? currentRotation + 1 : currentRotation - 1
  }

  static preventEvent (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  static changingPath ({location, history}) {
    return location.pathname !== history.location.pathname
  }

  willSetView(rounded) {
    const ratio = rounded % 1
        , round = Math.round(rounded)

    if (ratio <= 0.1 && round !== this.props.viewIndex) {
      this.props.viewChange(round)
    }
  }

  componentWillMount() {
    const { length } = this.props.navigationList

    this.roundRotation = LocalContainer.round(length)
    this.dragCB = (targetRotation) => this.willSetView(this.roundRotation(LocalContainer.tap(targetRotation, this.props.rotationChange)))
    this.getTargetRotation = LocalContainer.nearest(360 / length, this.dragCB)
  }


  componentDidMount() {
    this.props.getNav && this.props.getNav(this.nav)

    this.slideBody = LocalContainer.slide(this.body, this.mainDiv, this.props.navigationList.length)
    // DEFINE DRAGGABLE
    Draggable.create(this.nav, {
      type: 'rotation',
      trigger: this.mainDiv,
      onDrag: this.getTargetRotation(false),
      onDragEnd: this.getTargetRotation(true),
    })
  }

  componentWillReceiveProps({rotation}) {
    const magnitude = this.props.rotation - rotation
        , targetOffset = this.slideBody(magnitude % 360)

    this.setState(Object.assign({}, ...this.state, {targetOffset}))
  }

  shouldComponentUpdate({ viewIndex }) {
    return this.props.viewIndex !== viewIndex
  }

  componentDidUpdate() {
    this.slideBody = LocalContainer.slide(this.body, this.mainDiv, this.props.navigationList.length)
  }

  componentWillUnmount() {
    return LocalContainer.changingPath(this.props) && (this.props.rotationRestart(), this.props.viewRestart())
  }

  handleToggleBody() {
    this.toggleBody()
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
  viewChange: (index) => dispatch(viewChange(index)),
  viewRestart: () => dispatch(viewRestart())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LocalContainer))
