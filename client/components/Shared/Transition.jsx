import React from 'react'
import { Transition } from 'react-transition-group'
import { TimelineLite, Power2 } from 'gsap'

import { viewData } from './Data'

let toggle = false
  , prevColor = '#ecf0f1'

const themeColor = {
  '/': '#ecf0f1',
  '/about': viewData.about.backgroundColor[0],
  '/projects': viewData.projects.backgroundColor[0],
}

const showAnimation = (() => {
  const frontIndex = -99
    , behindIndex = -100
    , slideDuration = 0.39
    , fadeInDuration = 0.3

  const slideVerticalBackground = (bgBehind, bgFront, tl, lastAnimation, repeat = 0) => {
    if (repeat < 0) {
      lastAnimation(tl)
    }
    else {
      tl
        .set(bgBehind, {zIndex: behindIndex}) // push current front to back
        .set(bgFront, {zIndex: frontIndex}) // push current back to front, does not appear, since height will be tweened from 0
        .from(bgFront, slideDuration, {
          height: 0,
          onComplete: (toggle = !toggle, slideVerticalBackground),
          onCompleteParams: [bgFront, bgBehind, tl, lastAnimation, repeat - 1]
        }) // tween new front to fill background
    }
  }

  const fadeInContent = (target) => (tl) => {
    tl
      .to(target, fadeInDuration, {
        autoAlpha: 1,
        marginTop: '+=20px'
      })
  }

  return (duration, color) => (target) => {
    const front = toggle ? document.getElementById('bgTwo') : document.getElementById('bgOne')
        , behind = toggle ? document.getElementById('bgOne') : document.getElementById('bgTwo')
        , repeat = Math.floor((duration - fadeInDuration) / slideDuration) - 1
        , tl = new TimelineLite()
          .set(target, {autoAlpha: 0, marginTop: '-=20px'})
          .set(behind, {backgroundColor: color})
    slideVerticalBackground(front, behind, tl, fadeInContent(target), repeat)
    console.log(toggle, 'BGONE IS FRONT IF FALSE : BGTWO IF TRUE')
  }
})()

// const hideAnimation = (duration) => (target) => {
//   return new TimelineLite()
//     .to(target.childNodes[0], duration, {
//     autoAlpha: 0,
//     marginTop: '40px',
//     ease: Power2.easeInOut
//   })
// }

export const Show = (props) => {
  const duration = props.timeout / 1000

  return (
    <Transition
      {...props}
      onEntering={showAnimation(duration || 0.5, themeColor[props.pathname || '/'])}
    />
  )
}

// const hideAnimation = (duration) => (target) => (
//   TweenLite.to(target, duration, {
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

const slideAnimation = (() => {

  const frontIndex = -99
    , behindIndex = -100
    , slideDuration = 0.5
    , fadeInDuration = 0.3

  const slideHorizontalBackground = (bgBehind, bgFront, tl, direction) => {
    tl
      .set(bgBehind, {zIndex: behindIndex})
      .set(bgFront, {zIndex: frontIndex, [direction]: 0})
      .from(bgFront, slideDuration, {
        width: 0,
        ease: Power2.easeInOut,
        onComplete: () => toggle = !toggle
      })
  }

  const slideInContent = (offset, target, tl) => {
    tl
      .from(target, fadeInDuration, {
      marginLeft: `${offset}px`,
      autoAlpha: 0,
      ease: Power2.easeInOut
    })
  }

  return (duration, offset, color) => (target) => {
    const front = toggle ? document.getElementById('bgTwo') : document.getElementById('bgOne')
        , behind = toggle ? document.getElementById('bgOne') : document.getElementById('bgTwo')
        , direction = offset > 0 ? 'right' : 'left'
        , tl = new TimelineLite()
          .set(behind, {backgroundColor: color})
          // .set(front, {backgroundColor: prevColor})
    slideHorizontalBackground(front, behind, tl, direction)
    slideInContent(offset, target, tl)
  }
})()

export const Slide = (_props) => {
  const props = Object.assign({}, _props)
    delete props.targetOffset; delete props.color
  return (
    <Transition
      {...props}
      timeout={600}
      onEntering={slideAnimation(props.duration || 0.8, _props.targetOffset % 200, _props.color || '#ecf0f1')}
    />
  )
}
