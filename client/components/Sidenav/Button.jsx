import React, { Component } from 'react'
import styled from 'styled-components'
import { TimelineLite, Back } from 'gsap'
import { Cross } from '../shared/Assets'

const Container = styled.div`
  position: fixed;
  left: 60px;
  top: 20px;
  z-index: 1001;
  cursor: pointer;
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
        scale: 1.2,
        rotation: 90,
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
        onClick={() => this.onClickWrapper(this.props.onClick)}
        onMouseOver={this.onHoverHandler.bind(this)}
        onMouseOut={this.onHoverOffHandler.bind(this)}
      >
        <Cross
          scale={0.1}
          innerRef={div => this.svg = div}
        />
      </Container>
    )
  }
}

export default LocalContainer
