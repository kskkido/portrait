import React from 'react'
import { Transition } from 'react-transition-group'
import { TimelineLite, Power2 } from 'gsap'

import { viewData } from './Data'
import { getFirstTwo, once } from './Utils'

let toggle = false
  , running = false


const themeColor = {
  '/': getFirstTwo(viewData.home.backgroundColor),
  '/about': getFirstTwo(viewData.about.backgroundColor),
  '/projects': getFirstTwo(viewData.projects.backgroundColor),
  '/contact':  getFirstTwo(viewData.contacts.backgroundColor)
}

const showAnimation = (() => {
  const frontIndex = -99
    , behindIndex = -100
    , slideDuration = 0.39
    , fadeInDuration = 0.4

  const firstCBAnimation = (_bgBehind, secondColor) => {
    console.log(secondColor, 'SECOND COLORRR')
    return (_tl) => {
      _tl.set(_bgBehind, {backgroundColor: secondColor})
    }
  }

  const slideVerticalBackground = (cb, lastAnimation) => {
    const curriedSlide = (bgBehind, bgFront, tl, repeat = 0) => {
      if (repeat < 0) {
        lastAnimation(tl)
      } else {
        tl
          .set(bgBehind, {zIndex: behindIndex}) // push current front to back
          .set(bgFront, {zIndex: frontIndex}) // push current back to front, does not appear, since height will be tweened from 0
          .from(bgFront, slideDuration, {
            height: 0,
            ease: Power2.easeOut,
            onComplete: curriedSlide,
            onCompleteParams: [bgFront, bgBehind, tl, repeat - 1]
          }, '+=0.05') // tween new front to fill background
        cb(tl)
      }
    }
    return curriedSlide
  }

  const fadeInList = (list) => {
    new TimelineLite()
      .staggerTo(list, fadeInDuration, {
        autoAlpha: 1,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        marginTop: '-=20px',
      }, 0.07)
  }

  const fadeInBody = (target, tl) => {
    tl
      .to(target, fadeInDuration, {
        autoAlpha: 1,
        marginTop: '+=40px',
        rotationX: 0,
        rotationY: 0,
        onComplete: () => running = false
      })
  }

  const callBackAnimations = (target, ...rest) => (tl) => {
    fadeInList(rest)
    fadeInBody(target, tl)
  }

  return (duration, color, color2 = '#fff') => (target) => {
    running = true
    const front = toggle ? document.getElementById('bgTwo') : document.getElementById('bgOne')
        , behind = toggle ? document.getElementById('bgOne') : document.getElementById('bgTwo')
        , sideNav = [] || document.getElementById('sideNav').childNodes
        , repeat = Math.floor((duration - fadeInDuration) / slideDuration) - 1
        , tl = new TimelineLite()
          .set([target, ...sideNav], {autoAlpha: 0, transformOrigin: 'left mid', rotationX: 22, rotationY: 22})
          .set(target, {marginTop: '-=40px'})
          .set(sideNav, {scale: 0, marginTop: '+=20px'}) // get rid of eventually with hideanimation
          .set(behind, {backgroundColor: color})

    slideVerticalBackground(once(firstCBAnimation(front, color2)), callBackAnimations(target, ...sideNav), color2)(front, behind, tl, repeat)

    toggle = !toggle
  }
})()

export const Show = (props) => {
  const duration = props.timeout / 1000
  const [color1, color2] = themeColor[props.pathname || '/']

  return (
    <Transition
      {...props}
      onEnter={showAnimation(duration || 0.5, color1, color2)}
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
    }, `-=${slideDuration - fadeInDuration}`)
    .delay(0.15)
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
  new TimelineLite()
    .to(target, 0.3, {
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
      onEntering={slideAnimation(props.duration || 0.8, ( _props.targetOffset * 2) % 300, _props.color || '#ecf0f1')}
      onExiting={fadeOut}
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

const collapseAnimation = (() => {

  const collapse = (main, tl) => {
    return tl
      .from(main, 0.3, {
        height: '0px',
      })
      .staggerFrom(main.childNodes, 0.6, {
        autoAlpha: 0,
        scale: 0,
        rotationX: '45',
        rotationY: '45',
      }, 0.1)
  }

  const uncollapse = (main, tl) => {
    tl
      .to(main, 0.2, {
        autoAlpha: 0,
      })
      .to(main, 0.3, {
        height: 0,
        marginTop: '-10px',
      }, '-=0.1')
  }

  return (isReverse) => ({ childNodes: [main]}) => {
    const tl = new TimelineLite()
    isReverse ? uncollapse(main, tl) : collapse(main, tl)
  }
})()

export const UncollapseList = (props) => {
  return (
    <Transition
      {...props}
      onEntering={collapseAnimation(false)}
      onExit={collapseAnimation(true)}
    />
  )
}
