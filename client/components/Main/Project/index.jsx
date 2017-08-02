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

const Project = ({ currentIndex, direction, inputBody, inputMain, inputNav, language, navigationList }) => {
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
      direction: 'right'
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
        , findRotation = ((rat) => (rotation) => (rotation - navSpace * index) * rat)(ratio)

    return (rotation) => {
      TweenMax.to(targetDOM, 0.7, {
        marginRight: `${findRotation(rotation)}px`
      })
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
    this.slideBody(rotation)
    const direction = LocalContainer.getDirection(this.props.rotation - rotation)
    this.setState(Object.assign({}, ...this.state, {direction}))
  }

  shouldComponentUpdate({ viewIndex }) {
    return this.props.viewIndex !== viewIndex
  }

  componentDidUpdate() {
    // reassign slideBody with new props index
    this.slideBody = LocalContainer.slide(this.body, this.state.navigationList.length, this.props.viewIndex)
  }

  render() {
    const { navigationList } = this.state

    return (
      <Project
        currentIndex = {this.props.viewIndex}
        direction={this.state.direction}
        inputBody={div => this.body = div}
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
  viewIndex: state.events.viewIndex,
  rotation: state.events.rotation
})

const mapDispatchToProps = (dispatch) => ({
  rotationChange: (rotation) => dispatch(rotationChange(rotation))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
