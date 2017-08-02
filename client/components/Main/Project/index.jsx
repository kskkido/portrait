import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TransitionGroup } from 'react-transition-group'
import Draggable from 'gsap/Draggable'
import { TweenMax } from 'gsap'
import { Slide } from '../../Shared/Transition'
import { MainContainer } from '../../Shared/Styles'
import Navigation from '../Navigation'
import ProjectView from './ProjectView'

import { rotationChange } from '../../../reducers/events'

const Project = ({  direction, inputBody, inputMain, inputNav, language, navigationList, targetOffset, viewIndex }) => {
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
            <ProjectView currentView={currentView} language={language} />
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
      navigationList: ['AUDIOSPHERE', 'STACKQUEST', 'PORTFOLIO'],
      direction: 'right',
      targetOffset: 20,
    }
  }

  static getDirection(magnitude) {
    return magnitude > 0 ? 'left' : 'right'
  }

  static nearest(fn, ratio) {
    return function (getRatio) {
      return function () {
        const { rotation } = this
            , targetRotation = getRatio ? Math.round(rotation / ratio) * ratio : rotation
        fn(targetRotation)
      }
    }
  }

  static slide(targetDOM, length, index) {
    const navSpace = 360 / length
        , ratio = (targetDOM.offsetWidth / 2) / navSpace
        , findOffset = ((rat) => (rotation) => (rotation - navSpace * index) * rat)(ratio)

    return (rotation) => {
      const targetOffset = findOffset(rotation)

      TweenMax.to(targetDOM, 0.7, {
        marginRight: `${targetOffset}px`
      }) // separate this

      return targetOffset
    }
  } // for gradual slide

  componentDidMount() {
    const { length } = this.state.navigationList

    this.slideBody = LocalContainer.slide(this.body, length, this.props.viewIndex)
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
    const targetOffset = this.slideBody(rotation)
    const direction = LocalContainer.getDirection(this.props.rotation - rotation)
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

    return (
      <Project
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
  viewIndex: state.events.viewIndex,
  rotation: state.events.rotation
})

const mapDispatchToProps = (dispatch) => ({
  rotationChange: (rotation) => dispatch(rotationChange(rotation)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
