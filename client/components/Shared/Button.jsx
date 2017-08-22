import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TimelineLite, TweenLite, Back } from 'gsap'
import Draggable from 'gsap/Draggable'
import { Arrow } from './Assets'
import { pathChange } from '../../reducers/events'
import { withRouter } from 'react-router-dom'

const Container = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
`

class LocalContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }

    this.onClickWrapper = this.onClickWrapper.bind(this)
  }

  static createSVGHoverAnimation(target) {
    return new TimelineLite({paused: true})
      .to(target, 0.4, {
        y: '+=20px',
        scaleY: 1.5,
        rotationY: 180,
        ease: Back.easeOut
      })
  }

  componentDidMount() {
    this.svgHoverAnimation = LocalContainer.createSVGHoverAnimation(this.svg)
  }

  onClickWrapper(fn) {
    return (fn(this.state.active), this.setState({active: !this.state.active}))
  }

  onHoverHandler() {
    return this.svgHoverAnimation.play()
  }

  onHoverOffHandler() {
    return this.svgHoverAnimation.reverse()
  }

  render() {

    return (
      <Container
        innerRef={div => this.container = div}
        onMouseOver={this.onHoverHandler.bind(this)}
        onMouseOut={this.onHoverOffHandler.bind(this)}
      >
        <Link
          to={this.props.path}
        >
          <Arrow
            scale={0.15}
            innerRef={div => this.svg = div}
          />
        </Link>
      </Container>
    )
  }
}

const mapDispatchToProps= (dispatch) => ({
  pathChange: (index) => dispatch(pathChange(index))
})

export default withRouter(connect(null, mapDispatchToProps)(LocalContainer))
