import React, { Component } from 'react'
import { TimelineMax } from 'gsap'

class LocalContainer extends Component {
  static createAnimation(target) {
    return new TimelineMax({repeat: -1, repeatDelay: 0.3})
      .to(target, 0.2, {opacity: 1})
      .to(target, 0.2, {opacity: 0}, '+=0.5')
  }

  componentDidMount() {
    this.animation = LocalContainer.createAnimation(this.svg)
  }

  componentWillUnmount() {
    this.animation.kill()
  }

  render() {

    return (
      <svg
        ref={div => this.svg = div}
        style={{position: 'absolute', opacity: 0}}
      >
        <rect height={this.props.height || '30'} width="1" />
      </svg>
    )
  }
}

export default LocalContainer
