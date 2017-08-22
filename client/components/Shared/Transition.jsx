import React from 'react'
import { Transition } from 'react-transition-group'
import { TimelineLite, Back, Power2 } from 'gsap'

import { viewData } from './Data'
import { convertToAsci, getFirstTwo, once } from './Utils'

let toggle = false
  , running = false

const themeColor = {
  '/': [viewData.home.backgroundColor[0], '#e8e5e6'],
  '/about': getFirstTwo(viewData.about.backgroundColor),
  '/projects': getFirstTwo(viewData.projects.backgroundColor),
  '/contact':  getFirstTwo(viewData.contact.backgroundColor)
}

/* ====== VERTICAL TRANSITION ====== */

const verticalSlide = (() => {
  const frontIndex = -99
    , behindIndex = -100
    , slideDuration = 0.35
    , fadeInDuration = 0.4

  const cbAnimation = (_bgBehind, secondColor) => {
    return (_tl) => {
      _tl.set(_bgBehind, {backgroundColor: secondColor})
    }
  }

  const slideVerticalBackground = (cb, lastCb, direction) => {
    const curriedSlide = (bgBehind, bgFront, tl, repeat = 0) => {
      if (repeat < 0) {
        lastCb(tl)
      } else {
        tl
          .set(bgBehind, {zIndex: behindIndex}) // push current front to back
          .set(bgFront, {zIndex: frontIndex}) // push current back to front, does not appear, since height will be tweened from 0
          .from(bgFront, slideDuration, {
            [direction]: 0,
            height: 0,
            ease: Power2.easeIn,
            onComplete: (...args) => (toggle = !toggle, cb.call(this, args[2]), curriedSlide.apply(this, args)),
            onCompleteParams: [bgFront, bgBehind, tl, repeat - 1],
            clearProps: direction
          }) // tween new front to fill background
      }
    }
    return curriedSlide
  }

  // const fadeInList = (list) => {
  //   new TimelineLite()
  //     .staggerTo(list, fadeInDuration, {
  //       autoAlpha: 1,
  //       scale: 1,
  //       rotationX: 0,
  //       rotationY: 0,
  //       marginTop: '-=20px',
  //     }, 0.07)
  // }

  const fadeInBody = (target, tl) => {
    tl
      .to(target, fadeInDuration, {
        autoAlpha: 1,
        top: '+=100px',
        ease: Back.easeOut,
        onComplete: () => running = false
      })
  }

  const lastCbAnimation = (target) => (tl) => {
    // fadeInList(rest)
    fadeInBody(target, tl)
  }

  return {
    onEnter: (duration, color, color2, direction = 'top') => (target, isAppearing) => {
      running = true
      const front = toggle ? document.getElementById('bgTwo') : document.getElementById('bgOne')
          , behind = toggle ? document.getElementById('bgOne') : document.getElementById('bgTwo')
          , repeat = isAppearing ? -1 : Math.floor((duration - fadeInDuration) / slideDuration) - 1
          , tl = new TimelineLite()
            // .set([target, ...sideNav], {autoAlpha: 0, top: '-=100px'})
            // .set(sideNav, {scale: 0, marginTop: '+=20px'}) // get rid of eventually with hideanimation
            .set(behind, {backgroundColor: color2})
            .delay(isAppearing ? 0.2 : 0.4)

      slideVerticalBackground(once(cbAnimation(front, color)), lastCbAnimation(target), direction)(front, behind, tl, repeat)


    },
    onExit: (target) => {
      new TimelineLite()
        .to(target, 0.3, {
          autoAlpha: 0,
          top: '-=200px',
        })
        .delay(0.1)
    }
  }
})()


const index = {
  '/': 0,
  '/about': 1,
  '/projects': 2,
  '/contact': 3
}

let prev = -1

const getDirection = (prevIndex, nextIndex) => (
  prevIndex - nextIndex < 0 ? 'top' : 'bottom'
)

export const Show = (props) => {
  const [color1, color2] = themeColor[props.pathname || '/']

  const currentIndex = index[props.pathname || '/']
      , direction = getDirection(prev, currentIndex)
  prev = currentIndex

  return (
    <Transition
      {...props}
      timeout={{enter: 1100, exit: 300}}
      onEnter={verticalSlide.onEnter(1.1, color1, color2, direction)}
      onExit={verticalSlide.onExit}
    />
  )
}

/* ====== HORIZONTAL TRANSITION ====== */

const horizontalSlide = (() => {

  const frontIndex = -99
    , behindIndex = -100
    , slideDuration = 0.5
    , fadeInDuration = 0.5

  const slideHorizontalBackground = (bgBehind, bgFront, tl, direction) => {
    tl
      .set(bgBehind, {zIndex: behindIndex})
      .set(bgFront, {zIndex: frontIndex})
      .from(bgFront, slideDuration, {
        [direction]: 0,
        width: 0,
        clearProps: direction
      })
  }

  const slideInContent = (offset, target, tl) => {
    tl
      .from(target, fadeInDuration, {
      marginLeft: `${offset}px`,
      autoAlpha: 0,
      ease: Back.easeOut
    }, `-=${slideDuration - 0.2}`)
  }

  return {
    onEnter: (duration, offset, color) => (target) => {
      if (running) return // hacky

      const front = toggle ? document.getElementById('bgTwo') : document.getElementById('bgOne')
          , behind = toggle ? document.getElementById('bgOne') : document.getElementById('bgTwo')
          , direction = offset > 0 ? 'right' : 'left'
          , tl = new TimelineLite()
            .set(behind, {backgroundColor: color})
      slideHorizontalBackground(front, behind, tl, direction); slideInContent(offset, target, tl)
      toggle = !toggle
    },
    onExit: (target) => {
      new TimelineLite()
        .to(target, 0.2, {
          autoAlpha: 0,
        })
    }
  }
})()

export const Slide = (_props) => {
  const props = Object.assign({}, _props)
    delete props.targetOffset; delete props.color
  return (
    <Transition
      {...props}
      timeout={600}
      onEntering={horizontalSlide.onEnter(props.duration || 0.8, ( _props.targetOffset * 2) % 300, _props.color || '#ecf0f1')}
      onExiting={horizontalSlide.onExit}
    />
  )
}

/* ====== COLLAPSE TRANSITION ====== */

const collapseAnimation = (() => {

  const collapse = ({ childNodes: [main] }) => {
    new TimelineLite()
      .from(main, 0.3, {
        height: '0px',
      })
      .staggerFrom(main.childNodes, 0.6, {
        autoAlpha: 0,
        scale: 0,
        rotationX: '45',
        rotationY: '45',
        ease: Back.easeOut,
      }, 0.1)
  }

  const uncollapse = ({ childNodes: [main] }) => {
    new TimelineLite()
      .to(main, 0.2, {
        autoAlpha: 0,
      })
      .to(main, 0.3, {
        height: 0,
        marginTop: '-10px',
      }, '-=0.1')
  }

  return {
    onEnter: collapse,
    onExit: uncollapse,
  }
})()

export const UncollapseList = (props) => {
  return (
    <Transition
      {...props}
      onEntering={collapseAnimation.onEnter}
      onExit={collapseAnimation.onExit}
    />
  )
}

/* ====== FADE TRANSITION ====== */

const fadeAnimation = (() => {

  const fadeIn = (delay = 0) => (target) => {
    new TimelineLite()
      .from(target, 0.6, {
        autoAlpha: 0,
        ease: Back.easeIn
      })
      .delay(delay)
  }

  const fadeOut = (delay = 0) => (target) => {
    new TimelineLite()
      .to(target, 0.3, {
        autoAlpha: 0,
      })
      .delay(delay)
  }

  const slideOut = (delay = 0) => (target) => {
    return new TimelineLite()
      .to(target, 0.5, {
        x: '+=100%',
        autoAlpha: 0
      })
      .delay(delay)
  }

  return {
    onEnter: fadeIn,
    onExit: fadeOut,
    onExitSlide: slideOut
  }
})()

export const Fade = (_props) => {
  const props = Object.assign({}, _props)
    delete props.onEnterDelay
    delete props.onExitDelay
    delete props.slideOut
  return (
    <Transition
      {...props}
      timeout={{enter: 600, exit: 300}}
      onEnter={fadeAnimation.onEnter(_props.onEnterDelay)}
      onExit={_props.slideOut ? fadeAnimation.onExitSlide(_props.onExitDelay) : fadeAnimation.onExit(_props.onExitDelay)}
    />
  )
}

const scrambleAnimation = (() => {

  const writeHtml = function (targetDom) {
    targetDom.textContent = String.fromCharCode(Math.floor(this.target.value))
  }

  const onEnter = (duration, delay, asciList) => ({ childNodes }) => {
    const letterDuration = duration / asciList.length
        , tl = new TimelineLite()
        .delay(delay)
    asciList.forEach((asci, i) => {
      tl.
        to({value: Math.floor(Math.random() * 93) + 33}, letterDuration, {
          value: asci,
          onUpdate: writeHtml,
          onUpdateParams: [childNodes[i]],
          ease: Back.easeOut
        })
    })
  }

  return {
    onEnter
  }
})()

export const Scramble = (_props) => {
  const props = Object.assign({}, _props)
  delete props.text; delete props.delay

  return (
    <Transition
      {...props}
      timeout={650}
      exit={false}
      onEnter={scrambleAnimation.onEnter(0.65, _props.delay, convertToAsci(_props.text || 'bleh'))}
    />
  )
}
