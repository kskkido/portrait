import React from 'react'
import { Transition } from 'react-transition-group'
import { TweenMax, Power2 } from 'gsap'

// const showAnimation = (duration) => (target) => (
//   TweenMax.from(target, duration, {
//     opacity: 0,
//     height: 0,
//     ease: Power2.easeInOut
//   })
// )

// export const Show = (props) => (
//   <Transition
//     {...props}
//     timeout={1000}
//     onEntering={showAnimation(props.duration || 0.5)}
//   />
// )

// const hideAnimation = (duration) => (target) => (
//   TweenMax.to(target, duration, {
//     opacity: 0,
//     height: 0,
//     ease: Power2.easeInOut
//   })
// )

// export const Hide = (props) => (
//   <Transition
//     {...props}
//     timeout={1000}
//     onExiting={hideAnimation(props.duration || 0.5)}
//   />
// )

// don't need this right now
// const slideAnimationDirection = {
//   right: {opacity: 0, marginRight: '-200px', ease: Power2.easeOut},
//   left: {opacity: 0, marginRight: '200px', ease: Power2.easeOut},
// }

const slideAnimation = (duration, offset = 200) => (target) => {
  console.log(offset, 'animation')
  TweenMax.from(target, duration, {
    opacity: 0,
    marginLeft: `${offset}px`,
    ease: Power2.easeOut
  })
}

export const Slide = (_props) => {
  const props = Object.assign({}, _props)
  delete props.targetOffset
  return (
    <Transition
      {...props}
      timeout={600}
      onEntering={slideAnimation(props.duration || 0.8, _props.targetOffset % 200)}
    />
  )
}
