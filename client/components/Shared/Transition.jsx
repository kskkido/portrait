import React from 'react'
import { Transition } from 'react-transition-group'
import { TimelineLite, Power2 } from 'gsap'

import { viewData } from './Data'

let toggle = false
  , running = false

const themeColor = {
  '/': '#e8e5e6',
  '/about': viewData.about.backgroundColor[0],
  '/projects': viewData.projects.backgroundColor[0],
  '/contact': '#c1839f'
}

const showAnimation = (() => {
  const frontIndex = -99
    , behindIndex = -100
    , slideDuration = 0.39
    , fadeInDuration = 0.3

  const slideVerticalBackground = (bgBehind, bgFront, tl, lastAnimation, repeat = 0) => {
    if (repeat < 0) {
      lastAnimation(tl)
    } else {
      tl
        .set(bgBehind, {zIndex: behindIndex}) // push current front to back
        .set(bgFront, {zIndex: frontIndex}) // push current back to front, does not appear, since height will be tweened from 0
        .from(bgFront, slideDuration, {
          height: 0,
          ease: Power2.easeOut,
          onComplete: slideVerticalBackground,
          onCompleteParams: [bgFront, bgBehind, tl, lastAnimation, repeat - 1]
        }) // tween new front to fill background
    }
  }

  const fadeInContent = (sideNav, target) => (tl) => {
    tl
      .to([sideNav, target], fadeInDuration, {
        autoAlpha: 1,
        marginTop: '+=40px',
        onComplete: () => running = false
      })
  }

  return (duration, color) => (target) => {
    running = true
    const front = toggle ? document.getElementById('bgTwo') : document.getElementById('bgOne')
        , behind = toggle ? document.getElementById('bgOne') : document.getElementById('bgTwo')
        , sideNav = document.getElementById('sideNav')
        , repeat = Math.floor((duration - fadeInDuration) / slideDuration) - 1
        , tl = new TimelineLite()
          .set([target, sideNav], {autoAlpha: 0, marginTop: '-=40px'})
          .set(behind, {backgroundColor: color})
    slideVerticalBackground(front, behind, tl, fadeInContent(sideNav, target), repeat)
    toggle = !toggle
  }
})()

export const Show = (props) => {
  const duration = props.timeout / 1000

  return (
    <Transition
      {...props}
      onEnter={showAnimation(duration || 0.5, themeColor[props.pathname || '/'])}
    />
  )
}

const slideAnimation = (() => {

  const frontIndex = -99
    , behindIndex = -100
    , slideDuration = 0.5
    , fadeInDuration = 0.3

  const slideHorizontalBackground = (bgBehind, bgFront, tl, direction) => {
    tl
      .set(bgBehind, {zIndex: behindIndex})
      .set(bgFront, {zIndex: frontIndex})
      .from(bgFront, slideDuration, {
        [direction]: 0,
        width: 0,
        ease: Power2.easeInOut,
        clearProps: direction
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
    if (running) return // hacky

    const front = toggle ? document.getElementById('bgTwo') : document.getElementById('bgOne')
        , behind = toggle ? document.getElementById('bgOne') : document.getElementById('bgTwo')
        , direction = offset > 0 ? 'right' : 'left'
        , tl = new TimelineLite()
          .set(behind, {backgroundColor: color})
    slideHorizontalBackground(front, behind, tl, direction); slideInContent(offset, target, tl)
    toggle = !toggle
  }
})()

const fadeOut = (target) => {
  const tl = new TimelineLite()
  tl
    .to(target, 0.1, {
      autoAlpha: 0
    })
}

export const Slide = (_props) => {
  const props = Object.assign({}, _props)
    delete props.targetOffset; delete props.color
  return (
    <Transition
      {...props}
      timeout={600}
      onEnter={slideAnimation(props.duration || 0.8, _props.targetOffset % 200, _props.color || '#ecf0f1')}
    />
  )
}

// const collapseAnimation = (() => {

//   const collapse = (target, tl) => {
//     tl
//       .from(target, 0.2, {
//         height: '0px',
//       })
//       .from(target, 0.2, {
//         marginLeft: '-10px',
//         opacity: 0,
//       })
//   }

//   return (duration) => (target) => {
//     const tl = new TimelineLite()
//     collapse(target, tl)
//   }

// })()

// export const Collapse = (props) => {
//   console.log('DO IT', props)
//   return (
//     <Transition
//       {...props}
//       timeout={600}
//       onEnter={collapseAnimation(props.duration || 0.4)}
//     />
//   )
// }
