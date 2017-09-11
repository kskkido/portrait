import React from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { TimelineLite, TweenLite, Back, Power2 } from 'gsap'

import { viewData } from './Data'
import { convertToAsci, getPrimaryAndSecondary, getPair, once } from './Utils'

let toggle = false
  , running = false

const themeColor = {
  '/': index => getPrimaryAndSecondary(viewData.home, index),
  '/about': index => getPrimaryAndSecondary(viewData.about, index),
  '/projects': index => getPrimaryAndSecondary(viewData.projects, index),
  '/contact':  index => getPrimaryAndSecondary(viewData.contact, index)
}

const indexHash = {
  '/': 0,
  '/about': 1,
  '/projects': 2,
  '/contact': 3,
  prev: -1,
  update(i) {
    this.prev = i
  },
  getDirection(nextPath) {
    return (setTimeout(this.update.bind(this), 0, this[nextPath]), this.prev - this[nextPath] < 0 ? 'top' : 'bottom')
  }
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
      running = false
    }
  }

  const slideVerticalBackground = (cb, lastCb, direction) => {
    const curriedSlide = (bgBehind, bgFront, tl, repeat = 0) => {
      if (repeat < 0) {
        lastCb(tl)
      } else {
        toggle = !toggle
        tl
          .set(bgBehind, {zIndex: behindIndex}) // push current front to back
          .set(bgFront, {zIndex: frontIndex}) // push current back to front, does not appear, since height will be tweened from 0
          .from(bgFront, slideDuration, {
            [direction]: 0,
            height: 0,
            ease: Power2.easeIn,
            onComplete: (...args) => (cb && cb.call(this, tl), curriedSlide.apply(this, args)),
            onCompleteParams: [bgFront, bgBehind, tl, repeat - 1],
            clearProps: direction
          }) // tween new front to fill background
      }
    }
    return curriedSlide
  }

  const fadeInBody = (target) => (tl) => {
    tl
      .to(target, fadeInDuration, {
        autoAlpha: 1,
        y: '+=200px',
        ease: Back.easeOut
      })
  }

  //horizontalSlide

  return {
    onEnter: (duration, direction = 'top', colors) => (target, isAppearing) => {
      running = !isAppearing

      const front = toggle ? document.getElementById('bgTwo') : document.getElementById('bgOne')
          , behind = toggle ? document.getElementById('bgOne') : document.getElementById('bgTwo')
          , repeat = isAppearing ? 0 : Math.floor((duration - fadeInDuration) / slideDuration) - 1
          , [frontColor, backColor] = getPair(repeat, colors)
          , tl = new TimelineLite()
            .set(target, {autoAlpha: 0, y: '-=200px' })
            .set(front, {height: '100vh'})
            .set(behind, {backgroundColor: frontColor, height: '100vh'})
            .delay(0.4)
      slideVerticalBackground(once(cbAnimation(front, backColor)), fadeInBody(target), direction)(front, behind, tl, repeat)

    },
    onExit: (target) => {
      new TimelineLite()
        .to(target, 0.3, {
          autoAlpha: 0,
          y: `-200px`,
        })
        .delay(0.1)
    }
  }
})()

export const Show = (props) => {
  const colorPair = indexHash.prev === indexHash[props.pathname] ?
        themeColor[props.pathname](props.viewIndex) :
        themeColor[props.pathname]()
      , direction = indexHash.getDirection(props.pathname)
      , duration = 1100

  return (
    <Transition
      {...props}
      timeout={{enter: duration, exit: 300}}
      onEnter={verticalSlide.onEnter(duration / 1000, direction, colorPair)}
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

  const slideInContent = (direction, target, tl) => {
    tl
      .from(target, fadeInDuration, {
      marginLeft: direction,
      opacity: 0,
      ease: Back.easeOut,
      clearProps: direction
    }, `-=${slideDuration - 0.2}`)
  }

  return {
    onEnter: (duration, direction, color) => (target) => {
      if (running) return // hacky

      const front = toggle ? document.getElementById('bgTwo') : document.getElementById('bgOne')
          , behind = toggle ? document.getElementById('bgOne') : document.getElementById('bgTwo')
          , tl = new TimelineLite()
            .set(behind, {backgroundColor: color})

      slideHorizontalBackground(front, behind, tl, direction); slideInContent(direction === 'right' ? '250px' : '-250px', target, tl)
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
  const direction = _props.targetOffset > 0 ? 'right' : 'left'
      , props = Object.assign({}, _props)
  delete props.targetOffset; delete props.color
  return (
    <Transition
      {...props}
      timeout={{enter: 800, exit: 200}}
      onEntering={horizontalSlide.onEnter(props.duration || 0.8, direction, _props.color || '#ecf0f1')}
      onExiting={horizontalSlide.onExit}
    />
  )
}

/* ====== COLLAPSE TRANSITION ====== */

const collapseAnimation = (() => {

  const collapse = ({ childNodes: [main] }) => {
    new TimelineLite()
      .from(main, 0.9, {
        height: '0',
        ease: Back.easeOut,
      })
      .staggerFrom(main.childNodes, 0.6, {
        autoAlpha: 0,
        scale: 0,
        rotationX: '45',
        rotationY: '45',
        ease: Back.easeOut,
      }, 0.15)
  }

  const uncollapse = ({ childNodes: [main] }) => {
    new TimelineLite()
      .to(main, 0.3, {
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
      timeout={{enter: 1150, exit: 600}}
      onEntering={collapseAnimation.onEnter}
      onExit={collapseAnimation.onExit}
    />
  )
}

/* ====== FADE TRANSITION ====== */

const fadeAnimation = (() => {

  const fadeIn = (delay = 0, duration = 0.6) => (target) => {
    new TimelineLite()
      .from(target, duration, {
        autoAlpha: 0,
        ease: Back.easeIn
      })
      .delay(delay)
  }

  const fadeOut = (delay = 0) => (target) => {
    new TimelineLite()
      .to(target, 0.3, {
        opacity: 0,
        clearProps: 'opacity'
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
    delete props.onEnterDuration
  return (
    <Transition
      {...props}
      timeout={{enter: 600, exit: 300}}
      onEnter={fadeAnimation.onEnter(_props.onEnterDelay, _props.onEnterDuration)}
      onExit={_props.slideOut ? fadeAnimation.onExitSlide(_props.onExitDelay) : fadeAnimation.onExit(_props.onExitDelay)}
    />
  )
}

const scrambleAnimation = (() => {

  const writeHtml = function (targetDom) {
    targetDom.textContent = String.fromCharCode(Math.floor(this.target.value))
  }

  const onEnter = (duration, delay = 0, asciList, tailText) =>
    function scramble ({childNodes}) {
      const letterDuration = duration / asciList.length
          , tail = tailText && document.getElementById('tail')
          , tl = new TimelineLite()
          .delay(delay)
      new Promise(res => asciList.forEach((asci, i, { length }) => {
        tl.
          to({value: Math.floor(Math.random() * 93) + 33}, letterDuration, {
            value: asci,
            onUpdate: writeHtml,
            onUpdateParams: [childNodes[i]],
            [i === length - 1 && 'onComplete']: res,
            ease: Back.easeOut
          })
      }))
      .then(tail && onEnter(duration, duration, convertToAsci(tailText))(tail))
    }

  return {
    onEnter
  }
})()

export const Scramble = (_props) => {
  const props = Object.assign({}, _props)
  delete props.text; delete props.delay
  delete props.tailText

  return (
    <Transition
      {...props}
      timeout={650}
      exit={false}
      onEnter={scrambleAnimation.onEnter(0.65, _props.delay, convertToAsci(_props.text || 'bleh'), _props.tailText)}
    />
  )
}

const BodyAnimation = (() => {
  const fadeInDuration = 0.4
      , fadeOutDuration = 0.3

  const fadeIn = (target) => {
    return new TimelineLite()
      .from(target.childNodes, fadeInDuration, {
        top: '-=200px',
        opacity: 0,
        ease: Back.easeOut
      })
      .delay(0.8)
  }

  const fadeOut = (target) => {
    return new TimelineLite()
      .to(target.childNodes, fadeOutDuration, {
        opacity: 0,
        top: '-=200px',
      })
      .delay(0.1)
  }

  return {
    onEnter: fadeIn,
    onExit: fadeOut
  }
})()

export const BodyFade = (props) => {

  return (
    <Transition
      {...props}
      timeout={{enter: 1200, exit: 400}}
      onEnter={BodyAnimation.onEnter}
      onExit={BodyAnimation.onExit}
    />
  )
}
