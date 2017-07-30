import React from 'react'
import { Transition } from 'react-transition-group'
import { TweenMax, Power2 } from 'gsap'

const showAnimation = (duration) => (target) => (
  TweenMax.from(target, duration, {
    opacity: 0,
    height: 0,
    ease: Power2.easeInOut
  })
)

export const Show = (props) => (
  <Transition
    {...props}
    timeout={1000}
    onEntering={showAnimation(props.duration || 0.5)}
  />
)

const hideAnimation = (duration) => (target) => (
  TweenMax.to(target, duration, {
    opacity: 0,
    height: 0,
    ease: Power2.easeInOut
  })
)

export const Hide = (props) => (
  <Transition
    {...props}
    timeout={1000}
    onExiting={hideAnimation(props.duration || 0.5)}
  />
)

const slideAnimationDirection = {
  right: {opacity: 0, marginLeft: '10em', ease: Power2.easeOut},
  left: {opacity: 0, marginRight: '10em', ease: Power2.easeOut},
}

const slideAnimation = (duration, direction) => (target) => (
  TweenMax.from(target, duration, slideAnimationDirection[direction])
)

export const Slide = (props) => (
  <Transition
    {...props}
    timeout={600}
    onEntering={slideAnimation(props.duration || 0.6, props.direction || 'right')}
  />
)

const slideOutAnimation = (duration) => (target) => {
  return (
    TweenMax.from(target, duration, {
      marginTop: '-250px',
      ease: Power2.easeOut
    })
  )
}

export const SlideOut = (props) => (
  <Transition
    {...props}
    timeout={300}
    onEntering={slideOutAnimation(props.duration || 0.3)}
  />
)

export const slidePaddingLeft = (paddingLeft, color, target) => (
  TweenMax.to(target, 0.3, {
    paddingLeft,
    color
  })
)

