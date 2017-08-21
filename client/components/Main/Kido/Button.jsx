import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { Arrow } from '../../Shared/Assets'
import { pathChange } from '../../../reducers/events'

const Container = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`

const hash = {
  "/": 0,
  "/about": 1,
  "/projects": 2,
  '/contact': 3
}

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
        rotationY: 180,
        y: '+=10px',
        scaleY: 1.6,
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
          to={this.props.path || '/'}
          onClick={() => this.props.pathChange(hash[this.props.path])}
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

export default connect(null, mapDispatchToProps)(LocalContainer)
