import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import { TweenLite, Back } from 'gsap'
import Draggable from 'gsap/Draggable'
import { rotationChange, rotationRestart, viewChange, viewRestart } from '../../reducers/events'
import { media } from '../shared/Styles'
import { Slide } from '../shared/Transition'
import { memoize, tap } from '../shared/Utils'

import Navigation from './Navigation'

/* ====== HIGHER LEVEL COMPONENT FOR ABOUT AND PROJECT ====== */

const MainContainer = styled.div`
  display: inline-block;
  height: 100vh;
  width: 100%;
  cursor: move;
  position: absolute;
  top: ${props => props.isBody ? '-220px' : '190px'};
  ${media.phone`top: -160px`};
  z-index: 100;
`

const Body = styled.div`
  position: relative;
  top: 55px;
  width: 100%;
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
      targetOffset: 0
    }
  }

  static nearest(ratio, callback) {
    const getRotation = memoize((rotation) => Math.round(rotation / ratio) * ratio)

    return function (getRatio) {
      return function () {
        const { rotation } = this
            , targetRotation = getRatio ? getRotation(rotation) : rotation
        callback(targetRotation)
      }
    }
  }

  static slideDOM(bodyDOM) {
    return (targetOffset) => {
      TweenLite.to(bodyDOM, 0.7, {
        marginLeft: `${-targetOffset}px`,
        ease: Back.easeOut
      })
    }
  }

  static normalize (length) {
    return memoize((rotation) => {
      const normalized = rotation / (360 / length)
      return normalized < 0 ? (Math.ceil(-(normalized) / length) * length) + normalized : normalized % length
    })
  }

  static slide(mainDOM, length) {
    const ratio = (mainDOM.offsetWidth / 2) / (360 / length) // get the half of bodyDOM
        , getOffset = ((rat) => memoize((rotation) => ((rotation * rat) * 0.5)))(ratio)

    return (bodyDOM) => {
      const slideBodyDOM = LocalContainer.slideDOM(bodyDOM)
      let prevRotation = 0

      return (magnitude) => {
        prevRotation -= magnitude
        return tap(slideBodyDOM, getOffset(prevRotation))
      }
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

  willSetView(normalized) {
    const ratio = normalized % 1
        , rounded = Math.round(normalized)

    if (ratio <= 0.05 && rounded !== this.props.viewIndex) {
      this.props.viewChange(rounded)
    }
  }

  componentWillMount() {
    console.log('mounting ono no n ono')
    const { length } = this.props.navigationList

    this.isMobile = window.screen.width <= 768
    this.normalize = LocalContainer.normalize(length)
    this.dragCB = (targetRotation) => this.willSetView(this.normalize(tap( this.props.rotationChange, targetRotation)))
    this.getTargetRotation = LocalContainer.nearest(360 / length, this.dragCB)
  }


  componentDidMount() {
    if (this.isMobile && this.props.isBody) { return }

    this.props.getNav && this.props.getNav(this.nav)

    this.slideSetup = LocalContainer.slide(this.mainDiv, this.props.navigationList.length)
    this.slideBody = this.slideSetup(this.body)
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

    this.setState(Object.assign({}, {targetOffset}))
  }

  shouldComponentUpdate({ viewIndex }) {
    return this.props.viewIndex !== viewIndex
  }

  componentDidUpdate() {
    this.slideBody = this.slideSetup(this.body)
  }

  componentWillUnmount() {
    return LocalContainer.changingPath(this.props) && (this.props.rotationRestart(), this.props.viewRestart())
  }

  handleToggleBody() {
    this.toggleBody()
  }

  render() {

    return (
        <ContentView // ABOUT OR PROJECT
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
